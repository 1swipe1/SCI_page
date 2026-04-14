import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}#/reset-password`,
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 pb-24 md:pb-0">
      <div className="w-full max-w-sm">

        <h2 className="text-3xl font-black text-gray-950 text-center tracking-tight mb-4">비밀번호 찾기</h2>
        <p className="text-sm text-gray-400 text-center font-light mb-16">
          가입한 이메일을 입력하면 재설정 링크를 보내드립니다.
        </p>

        {sent ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              <span className="font-bold text-gray-900">{email}</span>으로<br />
              재설정 링크를 발송했습니다.<br />
              메일함을 확인해 주세요.
            </p>
            <Link
              to="/login"
              className="block w-full bg-black hover:bg-gray-800 text-white font-black text-sm tracking-widest py-4 transition-colors text-center"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border-b border-gray-300 pb-2">
              <input
                type="email"
                placeholder="가입한 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-base md:text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-black text-sm tracking-widest py-4 transition-colors"
            >
              {loading ? '전송 중...' : '재설정 링크 받기'}
            </button>

            <div className="flex justify-center text-sm text-gray-400">
              <Link to="/login" className="hover:text-gray-700 transition-colors">
                로그인으로 돌아가기
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
