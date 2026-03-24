import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 px-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* 로고 및 정보 영역 */}
        <div className="flex flex-col mb-8 md:mb-0">
          <Link to="/" className="text-2xl font-black text-[#1a4a9c] tracking-tighter mb-4">
            <span className="text-white">ㄱㅅㄷ</span> 과학기술인협동조합
          </Link>
          <div className="text-sm text-gray-400 space-y-2">
            <p>00000 서울특별시 강남구 논현로12길 19-1(개포동) 유니온빌딩</p>
            <p>Tel. 010-0000-0000 | Fax. 010-0000-0000</p>
            <p>Email. example@gmail.com</p>
          </div>
        </div>

        {/* 간단한 메뉴 (선택사항) */}
        <div className="flex space-x-6 text-sm text-gray-400">
          <Link to="/privacy" className="hover:text-white">개인정보처리방침</Link>
          <Link to="/terms" className="hover:text-white">이용약관</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;