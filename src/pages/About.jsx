import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DeptCard = ({ label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
      <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m2-9h.01M12 12h.01M17 12h.01M7 8h.01M12 8h.01M17 8h.01M7 16h.01M12 16h.01M17 16h.01" />
      </svg>
    </div>
    <span className="text-sm text-gray-900 font-medium">{label}</span>
  </div>
);

const About = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState('greetings');
  const [greetingExpanded, setGreetingExpanded] = useState(false);

  const greetingsRef = useRef(null);
  const introRef = useRef(null);
  const organizationRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const sectionId = hash.replace('#', '');
    setTimeout(() => scrollToSection(sectionId), 100);
  }, [hash]);

  useEffect(() => {
    const handleScroll = () => {
      const desktopOffset = 56 + 48;
      const mobileOffset = 64 + 64;
      const currentOffset = window.innerWidth < 768 ? mobileOffset : desktopOffset;
      const scrollPos = window.scrollY + currentOffset + 10;

      if (certRef.current && scrollPos >= certRef.current.offsetTop) {
        setActiveSection('cert');
      } else if (organizationRef.current && scrollPos >= organizationRef.current.offsetTop) {
        setActiveSection('organization');
      } else if (introRef.current && scrollPos >= introRef.current.offsetTop) {
        setActiveSection('intro');
      } else {
        setActiveSection('greetings');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const refs = { greetings: greetingsRef, intro: introRef, organization: organizationRef, cert: certRef };
    const targetRef = refs[sectionId];

    if (targetRef && targetRef.current) {
      const desktopOffset = 56 + 48;
      const mobileOffset = 64 + 64;
      const headerOffset = window.innerWidth < 768 ? mobileOffset : desktopOffset;

      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">

      {/* 1. 히어로 배너 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-3xl md:text-4xl font-black text-white tracking-[0.15em]">
          조합 소개
        </h1>
      </section>

      {/* 2. 탭바 */}
      <nav className="sticky top-15 z-40 bg-black text-white border-b border-white/10 h-10">
        <div className="max-w-7xl mx-auto flex h-full items-stretch">
          {[
            { id: 'greetings', label: '인사말' },
            { id: 'intro', label: '소개' },
            { id: 'organization', label: '조직도' },
            { id: 'cert', label: '인증현황' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`flex-1 h-full flex items-center justify-center text-[13px] md:text-[14px] font-black transition-all bg-black ${
                activeSection === tab.id
                ? 'text-white border-b-2 border-white'
                : 'text-white/30 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 인사말 */}
      <section
        id="greetings"
        ref={greetingsRef}
        className="py-16 site-px bg-white scroll-mt-32 md:scroll-mt-26 flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full md:bg-gray-50 md:rounded-2xl md:p-14">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-950 mb-14 tracking-tighter text-center">인사말</h2>
          <div className="text-[14px] text-gray-950 font-normal leading-loose break-keep tracking-wide space-y-4">
            <p>과학기술인협동조합 기술사업화지원단(기사단)은 관련 분야 박사학위 또는 공인 국가전문자격을 보유한 전문가들이 함께하는 과학기술인협동조합입니다. 창업지원 공공기관 경력자, 스타트업 및 중소기업 컨설팅 10년 이상의 경험과 노하우, 그리고 산·학·관에 걸친 폭넓은 네트워크를 바탕으로 고객의 과제에 최적의 솔루션을 제공합니다.<br/>기술사업화지원단은 이러한 축적된 전문성과 현장 실무 경험, 실행력 있는 네트워크를 바탕으로 창업기업 및 중소기업의 실질적인 경영성과 도출을 지원하기 위해 다양한 분야의 컨설팅과 교육 서비스를 제공합니다.</p>

            {/* 모바일: 접기/펼치기 / 데스크톱: 항상 표시 */}
            <div className={`space-y-4 md:block ${greetingExpanded ? 'block' : 'hidden'}`}>
              <p><strong>첫째,</strong> 기술창업 및 기술사업화를 위한 비즈니스 모델 검토 및 수립, 사업타당성 분석, 정부 국책사업 연계를 위한 기술사업계획서 작성 지원, 타겟 시장 조사·분석과 매출 증진을 위한 마케팅 전략수립 서비스를 제공합니다.<br/><strong>둘째,</strong> 기업의 신규 아이템 발굴과 사업성 분석, 기술가치 평가, R&D 중장기 전략 수립, ESG 대응전략 등 기술사업화 전 과정에 걸친 전문 컨설팅을 지원합니다.<br/><strong>셋째,</strong> 기업가정신, 디자인씽킹, 해커톤, 리더십 등 실무 중심의 맞춤형 교육 프로그램을 설계하고 운영합니다. 대학, 공공기관, 창업지원기관, 창업보육센터(BI) 등의 기관 맞춤형 전문 프로그램 개발이 가능합니다.<br/><strong>넷째,</strong> 창업기업 및 중소기업 육성과 관련된 정부기관 및 지방자치단체의 정책연구용역, 산업조사 연구용역을 수행합니다.<br/><strong>다섯째,</strong> 정책자금 확보를 위한 정보 제공과 신청 지원, 벤처기업인증·이노비즈 인증 등 각종 인증 획득을 국가전문자격 경영지도사가 합법적으로 대행해 드립니다.</p>
              <p>기술사업화지원단은 틀에 박힌 형식적인 컨설팅보다는 기업 현장에서 즉시 활용 가능한 구체적인 전략 수립과 이행계획을 제시하여, 컨설팅 이후 뚜렷한 가시적 성과를 도출하는 데 주력하고 있습니다.</p>
              <p className="mt-4 font-medium">기술에 전략을, 창업에 성장을.</p>
              <p className="leading-snug">창업기업과 중소기업의 진정한 성장 파트너가 되기 위하여, 기술사업화지원단은 최선의 노력을 다하겠습니다.</p>
              <p className="text-right leading-snug tracking-wide mt-14" style={{color:'#BEBEBE'}}>과학기술인협동조합 기술사업화지원단 임직원 일동</p>
            </div>

            {/* 더보기 버튼 (모바일만) */}
            <button
              onClick={() => setGreetingExpanded(!greetingExpanded)}
              className="md:hidden mt-2 text-[13px] font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              {greetingExpanded ? '접기' : '더보기'}
              <svg className={`w-3.5 h-3.5 transition-transform ${greetingExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 소개 */}
      <section
        id="intro"
        ref={introRef}
        className="py-16 site-px bg-gray-50 scroll-mt-32 md:scroll-mt-26 flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-950 mb-14 tracking-tighter text-center">소개</h2>          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070"
            alt="Intro"
            className="w-full h-40 object-cover mb-10"
          />
          <div className="text-[14px] text-gray-950 font-normal leading-snug break-keep tracking-wide space-y-4">
            <p>기술사업화지원단(기사단)은 기술창업, 기술사업화, 기업가정신 교육, 스케일업, 투자유치 분야의 국내 최고 전문가들이 모여 설립한 과학기술인협동조합입니다.</p>

            <div className="space-y-4">
              <p>조합원 전원이 관련 분야 박사학위 또는 공인 국가전문자격 보유자이며, 창업지원 공공기관 경력자, 스타트업 및 중소기업 컨설팅 10년 이상의 경험을 바탕으로 고객의 과제에 최적의 솔루션을 제공합니다.</p>
              <p>기관과 기업의 수요에 맞춘 원스톱 맞춤형 교육과 컨설팅을 제공합니다.</p>
            </div>
          </div>

          {/* 연혁 타임라인 */}
          <div className="mt-14">
            <h3 className="text-[18px] font-bold text-gray-950 mb-6 tracking-wide">연혁</h3>
            <div className="space-y-4">
              {[
                { year: '2024.02', desc: '과학기술인협동조합 기술사업화지원단 설립 (용인시 223호)' },
                { year: '2024.05', desc: '과학기술인협동조합 확인 (과기협동조합지원센터-66)' },
                { year: '2024', desc: '여성기업 확인 (제 0118-2024-33450 호)' },
                { year: '2024~', desc: '캠퍼스타운 BM분석(60개 기업), OO대학교 Startup-Booster Academy 운영' },
                { year: '2025', desc: '공공연수 적정 비용 기준 연구 수행 (완료)' },
                { year: '2025', desc: 'OO대학교 창업중심대학 창업기업 70개사 성과점검 및 컨설팅 수행' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-xs font-bold text-gray-400 tracking-widest uppercase w-20 shrink-0">{item.year}</span>
                  <span className="text-[14px] text-gray-950 font-normal tracking-wide">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 조직도 */}
      <section
        id="organization"
        ref={organizationRef}
        className="pt-16 pb-20 site-px bg-white scroll-mt-32 md:scroll-mt-26 flex items-center"
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-950 mb-14 tracking-tighter text-center">조직도</h2>          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
            <DeptCard label="조합이사장" />
            <DeptCard label="컨설팅단" />
            <DeptCard label="교육지원단" />
            <DeptCard label="기업혁신지원단" />
            <DeptCard label="R&D기획지원단" />
            <DeptCard label="시장진출지원단" />
          </div>
        </div>
      </section>

      {/* 인증 현황 */}
      <section
        id="cert"
        ref={certRef}
        className="pt-16 pb-24 site-px bg-gray-50 scroll-mt-32 md:scroll-mt-26"
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-950 mb-1 tracking-tighter text-center">인증 현황</h2>
          <p className="text-[14px] md:text-[16px] text-gray-400 font-light mb-12 text-center">기술사업화지원단이 보유한 공인 인증 현황입니다.</p>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
            {[
              {
                title: '과학기술인 협동조합',
                subtitle: '등록확인',
                detail: '과기협동조합지원센터-66',
                year: '2024',
                image: 'images/certs/확인서_과학기술인협동조합.png',
              },
              {
                title: '여성기업 확인서',
                subtitle: '여성기업확인',
                detail: '제 0118-2024-33450 호',
                year: '2024',
                image: 'images/certs/확인서_여성기업.png',
              },
              {
                title: '중소기업 확인서',
                subtitle: '소기업 · 공공입찰용',
                detail: '사업자등록번호 459-86-03431',
                year: '2025',
                image: 'images/certs/확인서_중소기업.png',
              },
            ].map((cert, i) => (
              <div key={i} className="snap-center shrink-0 w-[75vw] md:w-auto bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden mb-5">
                  <img
                    src={`${import.meta.env.BASE_URL}${cert.image}`}
                    alt={cert.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-[18px] font-bold text-gray-950 mb-1 tracking-wide">{cert.title}</h3>
                <p className="text-[14px] text-gray-500 font-light mb-3 tracking-wide">{cert.subtitle}</p>
                <p className="text-xs text-gray-400 font-light tracking-wide">{cert.detail}</p>
                <p className="text-xs text-gray-400 font-light mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
