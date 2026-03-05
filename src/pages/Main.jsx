import React from 'react';

const Main = () => {
  // 사업 영역 데이터 (시안 참고)
  const businessAreas = [
    { title: "비즈니스 연결", desc: "과학기술 기반의 비즈니스 매칭 및 사업화 지원", color: "bg-[#1a4a9c] text-white" },
    { title: "인적 연결", desc: "분야별 전문가 네트워크 구축 및 인재 매칭", color: "bg-white border border-gray-200" },
    { title: "지역 연결", desc: "지역 사회 문제 해결을 위한 기술 공헌 프로젝트", color: "bg-[#1a4a9c] text-white" },
    { title: "공공 연결", desc: "정부 및 지자체 공공 과제 수행 및 정책 제안", color: "bg-white border border-gray-200" }
  ];

  return (
    <div className="w-full">
      {/* 1. 히어로 섹션 (Hero Section) */}
      <section className="bg-[#1a4a9c] text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            기술창업, 기술사업화, 투자유치 등 <br className="hidden md:block" />
            국내 최고의 전문가들이 함께합니다.
          </h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            ㄱㅅㄷ 과학기술인협동조합은 과학기술을 통해 <br />
            더 나은 미래와 지속 가능한 가치를 창출합니다.
          </p>
          <button className="bg-white text-[#1a4a9c] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            조합 소개 자세히 보기
          </button>
        </div>
      </section>

      {/* 2. 사업 영역 섹션 (Business Areas) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 italic">Business Areas</h2>
            <div className="w-16 h-1 bg-[#1a4a9c] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessAreas.map((area, index) => (
              <div 
                key={index} 
                className={`p-10 rounded-3xl shadow-sm transition-transform hover:-translate-y-2 duration-300 ${area.color}`}
              >
                <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  {area.desc}
                </p>
                <div className="mt-8 text-xs font-semibold uppercase tracking-widest">Read More +</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;