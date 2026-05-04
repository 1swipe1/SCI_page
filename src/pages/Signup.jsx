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

    try {
      const { data, error } = await supabase.functions.invoke('signup-user', {
        body: { email, password, full_name: name, organization: org },
      });

      if (error || data?.error) {
        setError(data?.error || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      setEmailSent(true);
    } catch (e) {
      setError("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl font-semibold text-gray-950 tracking-tight mb-3">가입 신청이 완료되었습니다</h2>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed mb-2">
            관리자 승인 후 로그인이 가능합니다.
          </p>
          <p className="text-[13px] text-gray-400 font-light mb-10">
            승인이 완료되면 로그인하실 수 있습니다.
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

        <h2 className="text-[24px] md:text-3xl font-semibold text-gray-950 text-center tracking-tight mb-16">회원가입</h2>

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
            className="w-full bg-black hover:bg-white hover:text-black border border-black text-white font-black text-sm tracking-widest py-4 transition-colors disabled:bg-gray-400"
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
