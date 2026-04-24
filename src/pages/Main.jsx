import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* --- 기획안 §1 슬로건 반영 --- */
  const slides = [
    {
      title: "기술에 전략을, 창업에 성장을",
      desc: "기술사업화지원단(기사단)은 기술창업부터 사업화, 스케일업까지 각 단계별 최고의 전문가들이 함께하는 과학기술인협동조합입니다.",
      img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070"
    },
    {
      title: "전문가가 함께하는 원스톱 컨설팅",
      desc: "조합원 전원이 박사학위 또는 국가전문자격 보유자. 10년 이상의 현장 경험을 바탕으로 최적의 솔루션을 제공합니다.",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070"
    },
    {
      title: "130개+ 기업과 함께 성장한 파트너",
      desc: "캠퍼스타운, 창업중심대학 등 다양한 프로젝트를 통해 실질적인 성과를 만들어 왔습니다.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  /* --- 기획안 §3 핵심 서비스 카드 --- */
  const serviceCards = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      title: '기술창업 컨설팅',
      desc: '예비창업부터 초기창업까지, 기술 기반 창업의 전 과정을 지원합니다.사업계획서 작성, BM 설계,정부지원사업 선정 컨설팅을 제공합니다.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      ),
      title: '기술사업화 전략',
      desc: '기술의 상업적 가치를 분석하고, 시장 진출 전략을 수립합니다. 사업타당성 분석, R&D 기획, 기술가치평가를 통해 실행 가능한 로드맵을 제시합니다.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      ),
      title: '교육 프로그램',
      desc: '기업가정신, 디자인씽킹, 해커톤, 리더십 등 실무 중심의 맞춤형 교육을 설계하고 운영합니다. 대학, 공공기관, 기업 대상 프로그램 개발이 가능합니다.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      ),
      title: '연구용역 수행',
      desc: '기술사업화, 창업생태계, 정책연구 분야의 연구용역을 수행합니다. 데이터 기반의 조사와 분석을 통해 실질적인 정책적 시사점을 도출합니다.',
    },
  ];

  /* --- 기획안 §4 실적 숫자 --- */
  const stats = [
    { number: '11+', label: '전문가 조합원', desc: '박사학위 또는 국가전문자격 보유' },
    { number: '10+', label: '평균 컨설팅 경력', desc: '스타트업/중소기업 컨설팅 분야' },
    { number: '130+', label: '기업 BM 진단/컨설팅', desc: '캠퍼스타운·창업중심대학 등' },
    { number: '3+', label: '연구용역 수행', desc: '공공기관, 대학교 등' },
  ];

  /* --- 기획안 §5 최근 활동 프리뷰 --- */
  const recentActivities = [
    {
      title: '캠퍼스타운 입주기업 진단 및 BM 분석',
      desc: '캠퍼스타운 입주 스타트업 60개 기업을 대상으로 경영 현황 진단과 비즈니스 모델 분석을 수행하여 기업별 성장 전략을 제시했습니다.',
      tag: '컨설팅',
    },
    {
      title: '소상공인 성장지원 온라인 교육',
      desc: '소상공인을 대상으로 한 성장지원 온라인 교육 프로그램을 기획하고 운영했습니다.',
      tag: '교육',
    },
    {
      title: 'OO대학교 창업보육센터 Startup-Booster Academy',
      desc: 'OO대학교 창업보육센터 Biz-Up 프로그램의 운영사로서 창업기업 대상 멘토링, 교육, 사업화 지원을 수행했습니다.',
      tag: '창업보육',
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* === 1. 히어로 슬라이더 === */}
      <section className="relative h-screen min-h-175 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img src={slide.img} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30 flex items-center px-10 md:px-20 xl:px-[15.625%] pt-10">
              <div className="max-w-[1320px] mx-auto w-full">
                <div className="max-w-2xl md:max-w-none">
                  <h1 className="text-3xl md:text-[3.125vw] font-black text-white mb-4 tracking-tighter drop-shadow-lg break-keep md:whitespace-nowrap">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-[0.9375vw] text-white/75 leading-relaxed font-light break-keep md:whitespace-nowrap">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === i ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
        <button onClick={prevSlide} className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all z-20">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all z-20">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
        </button>
      </section>

      {/* === 2. 최근 활동 — 좌측 텍스트 + 우측 이미지 오버레이 카드 === */}
      <section className="py-36 px-10 md:px-20 xl:px-[15.625%] bg-white">
        <div className="w-full flex flex-col md:flex-row gap-10 items-start">

          {/* 좌측: 타이틀 + 버튼 */}
          <div className="md:w-52 shrink-0 flex flex-col gap-15">
            <div>
              <h2 className="text-[1.667vw] font-bold text-gray-950 tracking-tighter" style={{marginBottom: '1.042vw'}}>최근 활동</h2>
              <p className="text-[0.625vw] text-gray-400 font-light whitespace-nowrap">기사단이 수행한 주요 프로젝트를 소개합니다.</p>
            </div>
            <Link
              to="/gallery#lecture"
              onClick={() => window.scrollTo(0, 0)}
              className="self-start px-5 py-2 text-[12px] font-bold text-gray-950 tracking-widest border border-gray-400 rounded-full hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all"
            >
              전체 활동 보기
            </Link>
          </div>

          {/* 우측: 이미지 오버레이 카드 3개 */}
          <div className="flex flex-1 justify-end" style={{gap: '0.573%'}}>
            {recentActivities.map((item, i) => (
              <Link
                to="/gallery#lecture"
                key={i}
                onClick={() => window.scrollTo(0, 0)}
                className="group relative rounded-xl overflow-hidden flex flex-col aspect-3/4"
                style={{width: 'min(300px, calc((100% - 20px) / 3))', flexShrink: 1, paddingLeft: '1.563vw', paddingRight: '1.563vw', paddingTop: '1.563vw', paddingBottom: '1.563vw'}}
              >
                {/* 배경 이미지 */}
                <img
                  src={slides[i % slides.length].img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* 어두운 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/75" />
                {/* 검정 오퍼시티 60% */}
                <div className="absolute inset-0 bg-black/60" />

                {/* 태그 (상단) */}
                <div className="relative z-10">
                  <span className="text-[0.625vw] font-bold text-white tracking-widest">
                    {item.tag}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="absolute z-10 text-[0.9375vw] font-bold text-white leading-snug break-keep"
                  style={{top: '13.021vw', left: '1.563vw', right: '1.563vw', transform: 'translateY(-50%)'}}>
                  {item.title}
                </h3>

                {/* 설명 — 상단에서 정확히 250px(13.021vw) */}
                <p className="absolute z-10 text-[0.729vw] text-white/70 font-light leading-relaxed break-keep line-clamp-3"
                  style={{top: '14.583vw', left: '1.563vw', right: '1.563vw'}}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* === 3. 조합 소개 — 좌측 라벨 + 우측 숫자 === */}
      <section className="relative pt-14 pb-44 px-10 md:px-20 xl:px-[15.625%] overflow-hidden">
        {/* 배경 이미지 + 오버레이 */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-[1320px] mx-auto w-full flex flex-col md:flex-row items-start gap-10">

          {/* 좌측: 라벨 */}
          <div className="md:w-56 shrink-0">
            <h2 className="text-[1.667vw] font-bold text-white tracking-tighter" style={{marginBottom: '1.042vw'}}>조합 소개</h2>
            <p className="text-[0.625vw] text-white/50 font-light leading-relaxed break-keep">과학기술인협동조합은 a 바탕으로<br/>신뢰성있는 서비스를 제공합니다.</p>
          </div>

          {/* 우측: 통계 */}
          <div className="ml-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-bold text-white mb-1">
                  <span style={{fontSize: '3.333vw'}}>{stat.number.replace('+', '')}</span>
                  <span style={{fontSize: '2.5vw'}}>+</span>
                </p>
                <p className="font-bold text-white/70 mb-0.5" style={{fontSize: '0.729vw'}}>{stat.label}</p>
                <p className="text-white/35 font-light" style={{fontSize: '0.625vw'}}>{stat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === 4. 핵심 서비스 — 좌측 정렬 헤딩 + 카드 그리드 === */}
      <section className="pt-16 pb-32 px-10 md:px-20 xl:px-[15.625%] bg-gray-100">
        <div className="max-w-[1320px] mx-auto w-full">

          {/* 헤딩 */}
          <div className="mb-20">
            <h2 className="text-[1.667vw] font-bold text-gray-950 tracking-tighter" style={{marginBottom: '1.042vw'}}>핵심 서비스</h2>
            <p className="text-[0.625vw] text-gray-400 font-light">기관과 기업의 수요에 맞춘 <br/>원스톱 맞춤형 교육과 컨설팅을 제공합니다.</p>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCards.map((card, i) => (
              <Link to="/business" key={i} className="relative bg-white py-8 px-10 min-h-96 rounded-2xl border border-gray-950 hover:shadow-lg transition-all group flex flex-col items-start">
                <div className="absolute top-8 left-10 text-gray-300 group-hover:text-gray-900 transition-colors">
                  {card.icon}
                </div>
                <h3 className="absolute text-left text-[0.9375vw] font-bold text-gray-950 tracking-wide left-10 right-10" style={{top: '50%', transform: 'translateY(-50%)'}}>{card.title}</h3>
                <p className="absolute text-left text-[0.729vw] text-gray-400 font-light leading-relaxed left-10 right-10" style={{top: 'calc(50% + 2vw)'}}>{card.desc}</p>
              </Link>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="text-center mt-12">
            <Link
              to="/inquiry"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-10 py-3.5 bg-gray-950 text-white font-bold text-[13px] tracking-widest uppercase rounded-lg hover:bg-gray-700 transition-all"
            >
              문의하기
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Main;
