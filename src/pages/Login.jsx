import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
      alert("로그인 성공!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[#1a4a9c] text-center mb-8">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="이메일" className="w-full p-3 border rounded-lg" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="비밀번호" className="w-full p-3 border rounded-lg" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-[#1a4a9c] text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">로그인</button>
        </form>
      </div>
    </div>
  );
};
export default Login;