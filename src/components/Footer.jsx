import { Link } from 'react-router-dom';
import logoF from '../assets/logo_F.png';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-360 mx-auto px-6 md:px-20 xl:px-[15.625%]">

        {/* 상단 네비게이션 */}
        <div className="flex gap-x-4 md:gap-x-6 pt-8 pb-4 text-[11px] md:text-[13px] font-light text-white/30 tracking-wide md:tracking-widest overflow-x-auto">
          <Link to="/about"   className="hover:text-white transition-colors">조합소개</Link>
          <Link to="/members" className="hover:text-white transition-colors">조합원소개</Link>
          <Link to="/gallery" className="hover:text-white transition-colors">조합 활동</Link>
          <Link to="/notice"  className="hover:text-white transition-colors">공지/문의</Link>
          <Link to="/login"   className="hover:text-white transition-colors">로그인</Link>
        </div>

        {/* 구분선 */}
        <hr className="border-white/10" />

        {/* 하단 로고 + 연락처 */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 pt-4 pb-8">

          {/* 로고 */}
          <Link to="/" className="shrink-0 -translate-x-0.5">
            <img src={logoF} alt="과학기술인협동조합" className="h-7 md:h-8 w-auto object-contain" />
          </Link>

          {/* 연락처 */}
          <div className="text-[11px] md:text-[13px] font-light text-white/30 leading-snug tracking-wide md:tracking-widest text-left break-keep space-y-1">
            <p>경기도 용인시 기흥구 강남로 12, 805호 (구갈동, 스카이프라자)</p>
            <p>Tel. 031-322-2357 &nbsp; Fax. 050-4031-9057</p>
            <p>Email. kisadan01@naver.com &nbsp; Web. www.kisdan.org</p>
            <p className="text-[10px] md:text-[11px] break-all">
              사업자등록번호 459-86-03431 &nbsp;|&nbsp; 대표자 이자현 &nbsp;|&nbsp; 과학기술인협동조합 기술사업화지원단
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
