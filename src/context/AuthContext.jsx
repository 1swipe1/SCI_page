import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const rememberMe = localStorage.getItem('rememberMe');
        const activeSession = sessionStorage.getItem('activeSession');
        if (rememberMe === 'false' && !activeSession) {
          await supabase.auth.signOut();
          localStorage.removeItem('rememberMe');
          setUser(null);
        } else {
          setUser(session.user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // app_metadata는 서비스 롤(서버)만 수정 가능 — 클라이언트에서 위변조 불가
  const isAdmin = user?.app_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
