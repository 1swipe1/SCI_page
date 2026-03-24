import React, { useState } from 'react';

const Members = () => {
  // 1. 현재 어떤 탭이 선택되었는지 관리하는 상태
  const [activeTab, setActiveTab] = useState('business');

  // 2. 사업 분야 데이터
  const businessData = [
    {
      name: "이자현",
      role: "이사장 (사업분야)",
      career: [
        "가천대학교 대학원 회계세무학과 박사 (수료)",
        "아주대학교 대학원 기계공학 석사",
        "중소벤처기업부 비즈니스지원단 전문클리닉 위원"
      ],
      specialty: [
        "[전문분야]",
        "스타트업 재무분석 및 자금조달 실무",
        "중소기업 사업전환 컨설팅"
      ]
    }
  ];

  // 3. 컨설팅&심의 분야 데이터 (데이터가 달라야 바뀌는 게 보입니다)
  const consultingData = [
    {
      name: "홍길동",
      role: "전문위원 (컨설팅분야)",
      career: [
        "서울대학교 공과대학 박사",
        "한국기술사회 정회원",
        "국가 연구개발 과제 심의위원"
      ],
      specialty: [
        "[전문분야]",
        "건설 구조물 안전 진단",
        "토목 설계 및 공공 입찰 컨설팅"
      ]
    }
  ];

  // 4. 현재 선택된 탭에 따라 보여줄 데이터를 결정합니다.
  const currentData = activeTab === 'business' ? businessData : consultingData;

  return (
    <div className="bg-white min-h-screen">
      {/* 상단 히어로 섹션 */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
          alt="Business Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-4xl font-bold text-white tracking-widest">
          과학기술인협동조합
        </h1>
      </section>

      {/* 5. 서브 탭 메뉴 (버튼 클릭 시 setActiveTab 실행) */}
      <section className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex">
          <button 
            onClick={() => setActiveTab('business')}
            className={`flex-1 py-4 text-center font-bold transition-all ${
              activeTab === 'business' 
              ? 'bg-gray-50 text-[#1a4a9c] border-b-4 border-b-[#1a4a9c]' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            사업 분야
          </button>
          <button 
            onClick={() => setActiveTab('consulting')}
            className={`flex-1 py-4 text-center font-bold transition-all ${
              activeTab === 'consulting' 
              ? 'bg-gray-50 text-[#1a4a9c] border-b-4 border-b-[#1a4a9c]' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            컨설팅&심의 분야
          </button>
        </div>
      </section>

      {/* 6. 메인 콘텐츠 영역 (currentData를 사용하여 렌더링) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {activeTab === 'business' ? '사업 분야' : '컨설팅&심의 분야'}
          </h2>
          <p className="text-gray-500 text-lg">기사단의 멤버들을 소개합니다</p>
        </div>

        <div className="space-y-24">
          {currentData.map((member, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-12 items-start animate-fadeIn">
              {/* 프로필 사진 영역 */}
              <div className="w-[280px] h-[350px] bg-[#999] flex-shrink-0"></div>

              {/* 상세 정보 영역 */}
              <div className="flex-grow w-full">
                <div className="border-b border-gray-800 pb-2 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {member.name} <span className="text-gray-400 font-normal ml-2">| {member.role}</span>
                  </h3>
                </div>

                <div className="text-[15px] leading-relaxed text-gray-700">
                  <ul className="space-y-1">
                    {member.career.map((line, i) => (
                      <li key={i}>- {line}</li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    {member.specialty.map((line, i) => (
                      <p key={i} className={i === 0 ? "font-bold mb-1" : "pl-1"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Members;