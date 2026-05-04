import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }

    // 관리자는 승인 체크 생략
    if (data.user?.user_metadata?.role !== 'admin') {
      const { data: profile } = await supabase
        .from('profiles')
        .select('approved')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!profile?.approved) {
        await supabase.auth.signOut();
        alert('관리자 승인 대기 중입니다. 승인 후 로그인이 가능합니다.');
        return;
      }
    }

    if (remember) {
      localStorage.setItem('rememberMe', 'true');
      sessionStorage.removeItem('activeSession');
    } else {
      localStorage.setItem('rememberMe', 'false');
      sessionStorage.setItem('activeSession', '1');
    }
    if (data.user?.user_metadata?.role === 'admin') {
      alert('관리자로 로그인했습니다.');
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 pb-24 md:pb-0">
      <div className="w-full max-w-sm">

        <h2 className="text-[24px] md:text-3xl font-semibold text-gray-950 text-center tracking-tight mb-16">로그인</h2>

        <form onSubmit={handleLogin} className="space-y-8">
          {/* 아이디 */}
          <div className="border-b border-gray-300 pb-2">
            <input
              type="email"
              placeholder="아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-base md:text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div className="border-b border-gray-300 pb-2 flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 text-base md:text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="shrink-0 p-1 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* 로그인 유지 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRemember(!remember)}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ${remember ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <span
                className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                style={{ left: remember ? '18px' : '2px' }}
              />
            </button>
            <span className="text-sm text-gray-500">로그인 유지</span>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-white hover:text-black border border-black text-white font-black text-sm tracking-widest py-4 transition-colors"
          >
            로그인
          </button>

          {/* 회원가입 / 비밀번호 찾기 */}
          <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
            <Link to="/signup" className="hover:text-gray-700 transition-colors">
              회원가입
            </Link>
            <span className="opacity-30">|</span>
            <Link to="/forgot-password" className="hover:text-gray-700 transition-colors">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
