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

  // Supabase 대시보드 > Authentication > Users > 해당 유저 > user_metadata 에
  // {"role": "admin"} 으로 설정된 유저만 어드민으로 인정
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
