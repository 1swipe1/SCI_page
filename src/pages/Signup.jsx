import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (pw) => {
    if (pw.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!/[a-z]/.test(pw)) return "소문자를 포함해야 합니다.";
    if (!/[A-Z]/.test(pw)) return "대문자를 포함해야 합니다.";
    if (!/[0-9]/.test(pw)) return "숫자를 포함해야 합니다.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) return "특수문자를 포함해야 합니다.";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("성명을 입력해주세요."); return; }
    if (!email.trim()) { setError("이메일을 입력해주세요."); return; }
    if (!password) { setError("비밀번호를 입력해주세요."); return; }

    const pwValidation = validatePassword(password);
    if (pwValidation) { setError(pwValidation); return; }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin }
    });

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes('rate limit')) {
        setError("잠시 후 다시 시도해주세요. (이메일 발송 한도 초과)");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    // 이메일 중복: Supabase는 이미 가입된 이메일에 identities: [] 반환
    if (data.user?.identities?.length === 0) {
      setError("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
      setLoading(false);
      return;
    }

    // 프로필 저장
    if (data.user) {
      await supabase.from("profiles").insert([
        { id: data.user.id, full_name: name, organization: org }
      ]);
    }

    setLoading(false);
    setEmailSent(true);
  };

  // 인증 메일 발송 완료 화면
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pb-24">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight mb-3">이메일을 확인해주세요</h2>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed mb-2">
            <span className="text-gray-700 font-medium">{email}</span> 으로<br/>
            인증 링크를 발송했습니다.
          </p>
          <p className="text-[13px] text-gray-400 font-light mb-10">
            링크를 클릭하면 회원가입이 완료됩니다.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 border border-gray-300 text-gray-500 text-[13px] font-bold tracking-widest hover:border-gray-950 hover:text-gray-950 transition-all"
          >
            로그인 페이지로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 pb-24 md:pb-0">
      <div className="w-full max-w-sm">

        <h2 className="text-3xl font-black text-gray-950 text-center tracking-tight mb-16">회원가입</h2>

        <form onSubmit={handleSignup} className="space-y-8">

          {/* 성명 */}
          <div className="border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="성명"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* 소속 */}
          <div className="border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="소속 (기관/회사)"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* 이메일 */}
          <div className="border-b border-gray-300 pb-2">
            <input
              type="email"
              placeholder="이메일 (ID)"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required
              className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <div className="border-b border-gray-300 pb-2">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>
            {password && (
              <ul className="mt-3 space-y-1.5">
                {[
                  { label: '8자 이상', ok: password.length >= 8 },
                  { label: '소문자 포함', ok: /[a-z]/.test(password) },
                  { label: '대문자 포함', ok: /[A-Z]/.test(password) },
                  { label: '숫자 포함', ok: /[0-9]/.test(password) },
                  { label: '특수문자 포함', ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
                ].map(({ label, ok }) => (
                  <li key={label} className="flex items-center gap-2">
                    {ok ? (
                      <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-[12px] ${ok ? 'text-green-500' : 'text-red-400'}`}>{label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-[12px] text-red-400 -mt-4">{error}</p>
          )}

          {/* 가입 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-black text-sm tracking-widest py-4 transition-colors disabled:bg-gray-400"
          >
            {loading ? '처리 중...' : '가입하기'}
          </button>

          {/* 로그인 링크 */}
          <div className="text-right">
            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
              로그인
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;
