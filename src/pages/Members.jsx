
const BASE = import.meta.env.BASE_URL;

const Members = () => {
  const allMembers = [
    {
      id: 1,
      name: "이자현",
      role: "조합 이사장",
      image: "images/members/이자현.jpg",
      career: [
        "경영학 박사",
        "한국벤처창업학회 이사",
        "중부대학교 겸임교수",
        "창업지도사",
      ],
      specialty: [
        "디자인씽킹",
        "해커톤",
        "예비창업 컨설팅",
      ],
    },
    {
      id: 2,
      name: "백종일",
      role: "컨설팅지원 단장",
      image: "images/members/백종일.jpg",
      career: [
        "경영컨설팅학 박사",
        "아주대 창업벤처 전담교수",
        "경영지도사",
        "기술거래사 / 기업기술가치평가사",
      ],
      specialty: [
        "BM고도화 / AI활용",
        "사업타당성 분석",
        "ESG 대응전략",
      ],
    },
    {
      id: 3,
      name: "여재호",
      role: "교육지원 단장",
      image: "images/members/여재호.jpg",
      career: [
        "기술경영 박사 수료",
        "前 청년창업사관학교 본교 코칭팀장",
        "창업지도사",
        "인증코치(KPC)",
      ],
      specialty: [
        "기업가정신",
        "리더십",
        "커뮤니케이션 교육",
      ],
    },
    {
      id: 4,
      name: "이동호",
      role: "기업혁신지원 단장",
      image: "images/members/이동호.jpg",
      career: [
        "경영학 박사 수료",
        "경영지도사(재무)",
        "중소벤처기업부 비즈니스지원단",
        "구조혁신 컨설턴트(중진공)",
      ],
      specialty: [
        "재무관리",
        "자금조달",
        "기업회생",
      ],
    },
    {
      id: 5,
      name: "임충일",
      role: "R&D기획지원 단장",
      image: "images/members/임충일.jpg",
      career: [
        "경영학 박사",
        "경영지도사 / 기술신용평가사",
        "한양여대 S/W융합과 겸임교수",
        "정보처리산업기사",
      ],
      specialty: [
        "디지털전환",
        "R&D기획",
      ],
    },
    {
      id: 6,
      name: "최여원",
      role: "시장진출지원 단장",
      image: "images/members/최여원.jpg",
      career: [
        "경영컨설팅학 석사",
        "경영지도사(마케팅)",
        "창업보육전문매니저",
        "원가진단사 / 투자평가사 / 기업기술가치평가사",
      ],
      specialty: [
        "마케팅 전략",
        "시장진출",
        "투자평가",
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* 1. 히어로 섹션 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Members Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.15em]">조합원 소개</h1>
        </div>
      </section>

      {/* 2. 섹션 타이틀 */}
      <section className="pt-24 pb-10 text-center site-px">
        <h2 className="text-[32px] font-bold text-gray-950 mb-1 tracking-tighter">함께하는 분</h2>
        <p className="text-gray-400 text-sm font-light">기술사업화의 각 단계별 최고의 전문가들이 한 팀으로.</p>      </section>

      {/* 3. 멤버 카드 그리드 */}
      <section className="pb-32 site-px">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {allMembers.map((member) => (
            <div key={member.id} className="flex flex-col">

              {/* 프로필 이미지 */}
              <div className="w-full aspect-3/4 bg-gray-300 overflow-hidden">
                {member.image && (
                  <img
                    src={`${BASE}${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                  />
                )}
              </div>

              {/* 이름 | 직책 + 구분선 */}
              <div className="mt-6 pb-4 border-b border-gray-300">
                <h3 className="text-[18px] font-bold text-gray-950 tracking-wide">
                  {member.name} &nbsp;｜&nbsp; {member.role}
                </h3>
              </div>

              {/* 경력 */}
              <ul className="mt-5 space-y-0.5">
                {member.career.map((line, i) => (
                  <li key={i} className="text-[14px] text-gray-500 font-light tracking-wide flex items-start gap-1.5">
                    <span className="mt-0.75 shrink-0">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {/* 전문분야 */}
              <div className="mt-6">
                <p className="text-[14px] font-bold text-gray-950 tracking-wide mb-2">[전문분야]</p>
                <ul className="space-y-0.5">
                  {member.specialty.map((s, i) => (
                    <li key={i} className="text-[14px] text-gray-500 font-light tracking-wide flex items-start gap-1.5">
                      <span className="mt-0.75 shrink-0">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Members;
