import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-[#1a4a9c]">ㄱㅅㄷ <span className="text-sm text-gray-800">과학기술인협동조합</span></Link>
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link to="/about">조합 소개</Link>
            <Link to="/notice">알림마당</Link>
          </nav>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 text-sm opacity-70 text-center">
          Copyright © 2026 ㄱㅅㄷ All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
export default Layout;