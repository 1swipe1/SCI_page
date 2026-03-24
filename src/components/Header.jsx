import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 현재 활성화된 페이지 표시를 위한 함수
  const isActive = (path) => {
    return location.pathname === path ? "text-[#1a4a9c] font-bold" : "text-gray-800";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. 로고 영역 */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMenu} className="text-2xl font-black text-[#1a4a9c] tracking-tighter">
              ㄱㅅㄷ <span className="text-gray-800 font-bold text-lg ml-1">과학기술인협동조합</span>
            </Link>
          </div>

          {/* 2. 데스크탑 네비게이션 (조합활동 삭제, 공지/문의 분리) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className={`text-base font-medium transition-colors ${isActive('/about')}`}>조합 소개</Link>
            <Link to="/members" className={`text-base font-medium transition-colors ${isActive('/members')}`}>조합원 소개</Link>
            <Link to="/gallery" className={`text-base font-medium transition-colors ${isActive('/gallery')}`}>컨설팅 갤러리</Link>
            <Link to="/notice" className={`text-base font-medium transition-colors ${isActive('/notice')}`}>공지사항</Link>
            <Link to="/inquiry" className={`text-base font-medium transition-colors ${isActive('/inquiry')}`}>문의하기</Link>
          </nav>

          {/* 3. 데스크탑 우측 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-[#1a4a9c]">로그인</Link>
            <Link to="/signup" className="bg-[#1a4a9c] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-800 transition-all shadow-md">
              회원가입
            </Link>
          </div>

          {/* 4. 모바일 햄버거 버튼 */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-[#1a4a9c] focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 5. 모바일 드롭다운 메뉴 (반응형 대응) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/about" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-gray-800 border-b border-gray-50">조합 소개</Link>
            <Link to="/members" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-gray-800 border-b border-gray-50">조합원 소개</Link>
            <Link to="/gallery" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-gray-800 border-b border-gray-50">컨설팅 갤러리</Link>
            <Link to="/notice" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-gray-800 border-b border-gray-50">공지사항</Link>
            <Link to="/inquiry" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-gray-800 border-b border-gray-50">문의하기</Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/login" onClick={closeMenu} className="w-full text-center py-3 text-gray-700 font-bold border border-gray-200 rounded-xl">로그인</Link>
              <Link to="/signup" onClick={closeMenu} className="w-full text-center py-3 bg-[#1a4a9c] text-white rounded-xl font-bold shadow-md">회원가입</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;