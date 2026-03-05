import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // 1. 회원가입
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) return alert(error.message);

    // 2. 추가 정보(이름, 소속) 저장
    if (data.user) {
      await supabase.from("profiles").insert([
        { id: data.user.id, full_name: name, organization: org }
      ]);
      alert("회원가입 성공! 이메일을 확인해주세요.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#1a4a9c] text-center mb-8">회원가입</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="성명" className="w-full p-3 border rounded-lg" onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="소속 (기관/회사)" className="w-full p-3 border rounded-lg" onChange={(e) => setOrg(e.target.value)} />
          <input type="email" placeholder="이메일 (ID)" className="w-full p-3 border rounded-lg" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="비밀번호" className="w-full p-3 border rounded-lg" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-[#1a4a9c] text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">가입하기</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;