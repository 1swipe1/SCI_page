import React from 'react';

const Main = () => {
  // News & Update 데이터 예시 (도안의 날짜, 사진 요소 반영)
  const newsItems = [
    {
      id: 1,
      title: "2024년 과학기술인 협력 네트워크 발대식",
      date: "2024.03.20", // 
      image: "https://images.unsplash.com/photo-1591115765373-520b7a217217?auto=format&fit=crop&q=80&w=400", // 
      summary: "국내 최고의 과학기술 전문가들이 모여 새로운 비즈니스 모델을 논의했습니다."
    },
    {
      id: 2,
      title: "신규 AI 모듈 개발 프로젝트 착수",
      date: "2024.03.15", // 
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400", // 
      summary: "CCTV 이상행동 감지 AI 모듈 고도화를 위한 연구가 시작되었습니다."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. 상단 지난 소개 섹션  */}
      <section className="bg-[#1a4a9c] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-80">
            Introduction
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            과학기술의 가치를 연결하는 <br />
            ㄱㅅㄷ 과학기술인협동조합의 지난 발자취
          </h1>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
            우리는 지난 시간 동안 지역 사회와 공공 기관을 잇는 
            수많은 기술 공헌 프로젝트를 수행해 왔습니다. 
          </p>
        </div>
      </section>

      {/* 2. News & Update 섹션  */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">News & Update</h2> 
              <div className="w-12 h-1 bg-[#1a4a9c] mt-4"></div>
            </div>
            {/* 페이지 이동 버튼  */}
            <button className="text-[#1a4a9c] font-semibold hover:underline">
              전체보기 +
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {newsItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                {/* 사진 영역  */}
                <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* 날짜 영역  */}
                <span className="text-sm text-gray-500 font-medium">{item.date}</span> 
                <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-[#1a4a9c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.summary}
                </p>
                {/* 페이지로 이동  */}
                <div className="inline-flex items-center text-sm font-bold text-[#1a4a9c]">
                  자세히 보기
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;