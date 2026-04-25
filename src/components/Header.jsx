import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo3.png';
import logoW from '../assets/logo_W.png';

const Header = () => {
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/inquiry';

  const menuConfig = [
    {
      title: '조합 소개',
      path: '/about',
      subItems: [
        { name: '인사말', path: '/about#greetings' },
        { name: '소개', path: '/about#intro' },
        { name: '조직도', path: '/about#organization' }
      ]
    },
    {
      title: '조합원 소개',
      path: '/members',
      subItems: [
        {}
      ]
    },
    {
      title: '조합 활동',
      path: '/gallery',
      subItems: [
        { name: '사업 분야 소개', path: '/gallery' },
        { name: '조합 활동', path: '/gallery#lecture' }
      ]
    },
    {
      title: '공지&문의',
      path: '/notice',
      subItems: [
        { name: '공지사항', path: '/notice' },
        { name: '문의하기', path: '/inquiry' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsAtBottom(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('activeSession');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsHovered(false);
    setActiveMobileSub(null);
  };

  const handleNavClick = () => {
    closeAllMenus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowWhite = isScrolled || isHovered || isMobileMenuOpen || isAuthPage;

  return (
    <>
      <header 
        // 높이 축소: 모바일 h-14(56px), 데스크톱 h-16(64px)
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-15 border-b ${
          shouldShowWhite ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-100' : 'bg-transparent border-white/10'
        }`}
        onMouseEnter={() => window.innerWidth > 1024 && setIsHovered(true)}
        onMouseLeave={() => window.innerWidth > 1024 && setIsHovered(false)}
      >
        <div className="site-px h-full flex items-center justify-between">

          {/* 1. 로고 영역 (너비 250px 고정) */}
          <div className="w-auto lg:w-[250px] flex-shrink-0">
            <Link to="/" onClick={handleNavClick}>
              <img src={isAtBottom && !isAuthPage && !isHovered ? logoW : logo} alt="과학기술인협동조합" className="h-8 md:h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* 2. 메인 네비게이션 */}
          <nav className="hidden lg:flex grow h-full justify-center items-center gap-14">
            {menuConfig.map((item, idx) => (
              <div key={idx} className="relative h-full flex items-center">
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={`h-full flex items-center text-[13px] font-bold transition-all relative whitespace-nowrap ${
                    shouldShowWhite ? 'text-gray-900' : 'text-white'
                  } hover:text-black group`}
                >
                  {item.title}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* 아이템별 드롭다운 */}
                {isHovered && item.subItems && item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 px-6 py-5 flex flex-col items-center gap-3 z-10">
                    {item.subItems.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.path}
                        onClick={closeAllMenus}
                        className="text-gray-500 hover:text-black text-[12px] font-medium transition-colors whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 3. 우측 유틸리티 (너비 250px 고정) */}
          <div className={`hidden lg:flex w-[250px] justify-center items-center gap-5 text-[13px] font-bold tracking-tighter ${
            shouldShowWhite ? 'text-gray-400' : 'text-white/70'
          }`}>
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={handleNavClick} className="hover:text-black">ADMIN</Link>
                <Link to="/admin/inquiries" onClick={handleNavClick} className="hover:text-black">문의사항</Link>
                <button onClick={handleLogout} className="hover:text-red-500">LOGOUT</button>
              </>
            ) : user ? (
              <>
                <Link to="/mypage" onClick={handleNavClick} className="hover:text-black">MY PAGE</Link>
                <button onClick={handleLogout} className="hover:text-red-500">LOGOUT</button>
              </>
            ) : (
              <Link to="/login" onClick={handleNavClick} className="hover:text-black">LOGIN</Link>
            )}
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button 
            className="lg:hidden p-2 flex flex-col items-end gap-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-5 h-0.5 transition-all ${shouldShowWhite ? 'bg-black' : 'bg-white'}`}></div>
            <div className={`w-5 h-0.5 transition-all ${shouldShowWhite ? 'bg-black' : 'bg-white'}`}></div>
          </button>
        </div>

        {/* 전체 너비 드롭다운 배경 패널 */}
        <div className={`hidden lg:block absolute top-15 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 h-36' : 'opacity-0 h-0'
        }`} />

      </header>

      {/* 모바일 사이드 드로어 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-105"
          onClick={closeAllMenus}
        />
      )}

      {/* 모바일 사이드 드로어 */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-md z-110 flex flex-col transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* 드로어 헤더 */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <span className="font-black text-sm tracking-tight">MENU</span>
          <button onClick={closeAllMenus} className="p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 메뉴 목록 */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          {menuConfig.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className="py-3 text-[15px] font-black text-gray-900 tracking-tight"
                >
                  {item.title}
                </Link>
                {item.subItems.some(s => s.name) && (
                  <button
                    onClick={() => setActiveMobileSub(activeMobileSub === idx ? null : idx)}
                    className="p-1 text-gray-400"
                  >
                    <svg className={`w-4 h-4 transition-transform ${activeMobileSub === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {activeMobileSub === idx && (
                <div className="pl-3 pb-2 space-y-2 border-l border-gray-200 ml-1">
                  {item.subItems.filter(s => s.name).map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      onClick={closeAllMenus}
                      className="block py-1.5 text-[13px] text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-b border-gray-100" />
            </div>
          ))}
        </nav>

        {/* 하단 로그인 */}
        <div className="px-6 py-6 border-t border-gray-100 flex gap-4 text-[13px] font-bold text-gray-400">
          {isAdmin ? (
            <>
              <Link to="/admin" onClick={handleNavClick} className="hover:text-black">ADMIN</Link>
              <button onClick={handleLogout} className="hover:text-red-500">LOGOUT</button>
            </>
          ) : (
            <Link to="/login" onClick={handleNavClick} className="hover:text-gray-900">LOGIN</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;