import React, { useState } from 'react';

const Gallery = () => {
  // 프로젝트 카테고리 상태 (전체, AI, 토목, 구조 등)
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      id: 1,
      category: "AI",
      title: "CCTV 이상행동 감지 AI 모듈 개발",
      date: "2025.12",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
      desc: "딥러닝 기반 실시간 폭력 및 쓰러짐 감지 알고리즘 구현"
    },
    {
      id: 2,
      category: "구조",
      title: "교량 안전진단 및 구조 해석 컨설팅",
      date: "2026.02",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800",
      desc: "노후 교량 정밀 안전 점검 및 유지보수 전략 수립"
    },
    {
      id: 3,
      category: "지반",
      title: "대형 건축물 옹벽 안정성 검토",
      date: "2025.11",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800",
      desc: "캔틸레버식 옹벽 전도 및 활동 방지 설계 자문"
    },
    {
      id: 4,
      category: "GIS",
      title: "수치지형도 기반 홍수 시뮬레이션",
      date: "2026.01",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800",
      desc: "DEM 데이터를 활용한 저지대 침수 구역 예측 분석"
    }
  ];

  // 필터링된 데이터
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. 상단 히어로 섹션 (디자인 통일) */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
          alt="Gallery Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative text-4xl font-bold text-white tracking-widest">
          컨설팅 갤러리
        </h1>
      </section>

      {/* 2. 카테고리 필터 탭 */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex flex-wrap gap-4 justify-center border-b border-gray-100 pb-8">
          {['All', 'AI', '구조', '지반', 'GIS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                ? 'bg-[#1a4a9c] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 갤러리 그리드 영역 */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50">
              {/* 이미지 영역 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a4a9c] text-white text-xs font-bold px-3 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* 텍스트 영역 */}
              <div className="p-8">
                <span className="text-sm text-blue-500 font-bold mb-2 block">{project.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1a4a9c] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium tracking-tighter">SUCCESS CASE</span>
                  <button className="text-[#1a4a9c] text-sm font-bold flex items-center hover:translate-x-1 transition-transform">
                    자세히 보기 <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            해당 카테고리의 프로젝트가 아직 준비 중입니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallery;