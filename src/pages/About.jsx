import React from 'react';

const About = () => {
  // 조합의 연혁 데이터 (도안의 '지난 소개'와 '날짜' 요소 반영)
  const history = [
    { date: "2024.01", content: "ㄱㅅㄷ 과학기술인협동조합 설립" },
    { date: "2024.06", content: "공공기관 기술 컨설팅 파트너십 체결" },
    { date: "2025.03", content: "AI 기반 이상행동 감지 모듈 특허 출원" },
    { date: "2026.01", content: "지역 사회 문제 해결 기술 공헌 사업 확대" }
  ];

  return (
    <div className="bg-white">
      {/* 1. 상단 히어로 섹션 (도안의 '지난 소개' 반영) */}
      <section className="bg-gray-50 py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#1a4a9c] font-bold tracking-widest uppercase mb-4">About Us</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
            과학기술로 세상을 잇는 <br /> 
            전문화된 기술인들의 공동체
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            ㄱㅅㄷ 과학기술인협동조합은 개별 전문가들의 기술력을 결집하여 <br className="hidden md:block" />
            공공의 이익과 지속 가능한 기술 생태계를 구축하기 위해 설립되었습니다.
          </p>
        </div>
      </section>

      {/* 2. 비전 및 미션 섹션 */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a4a9c]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">기술 혁신</h3>
            <p className="text-gray-500">끊임없는 연구를 통해 실효성 있는 기술 솔루션을 제공합니다.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a4a9c]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">인적 연결</h3>
            <p className="text-gray-500">분야별 전문가들이 협력하여 최상의 시너지를 창출합니다.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a4a9c]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.653a2 2 0 01-.732 1.545l-1.613 1.29a2 2 0 01-1.28.412H12a2 2 0 00-2 2v.5" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">사회 기여</h3>
            <p className="text-gray-500">기술을 통해 지역 사회의 난제를 해결하고 가치를 환원합니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 연혁 섹션 (도안의 '날짜' 기반 나열) */}
      <section className="bg-gray-900 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center italic">History</h2>
          <div className="space-y-12">
            {history.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="text-[#3b82f6] font-bold text-xl w-32 flex-shrink-0">{item.date}</div>
                <div className="border-l-2 border-gray-700 pl-8 pb-4">
                  <p className="text-lg text-gray-300">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;