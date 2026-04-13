
const Gallery = () => {

  /* --- 기획안 §7 활동내역 프로젝트 5건 --- */
  const projects = [
    {
      id: 1,
      title: '캠퍼스타운 입주기업 진단 및 BM 분석',
      tags: ['컨설팅', 'BM분석', '스타트업'],
      summary: '캠퍼스타운 입주 스타트업 60개 기업을 대상으로 경영 현황 진단과 비즈니스 모델 분석을 수행하였습니다. 기업별 강점/약점을 도출하고 맞춤형 성장 전략을 제시하였습니다.',
    },
    {
      id: 2,
      title: '소상공인 성장지원 온라인 교육',
      tags: ['교육', '소상공인', '온라인'],
      summary: '소상공인을 대상으로 한 성장지원 온라인 교육 프로그램을 기획하고 운영하였습니다. 현장 중심의 실무 교육으로 소상공인의 경영역량 강화를 지원하였습니다.',
    },
    {
      id: 3,
      title: 'OO대학교 창업보육센터 Startup-Booster Academy 운영',
      tags: ['교육', '창업보육', '대학'],
      summary: 'OO대학교 창업보육센터 Biz-Up 프로그램의 운영사로서 창업기업 대상 전문 멘토링, 교육, 사업화 지원을 수행하였습니다.',
    },
    {
      id: 4,
      title: '중소벤처기업 대상 공공연수의 적정 비용 기준 연구',
      tags: ['연구용역', '정책연구', '원가분석'],
      period: '2025년',
      summary: '중소벤처기업 재직자 대상 공공연수 사업의 적정 비용 기준을 수립하기 위한 연구용역을 수행하였습니다. 연수사업 현황 분석, 유관기관 사례 비교, 원가모형 구축 및 단가 산정, 정책 활용 전략 도출까지 전 과정을 수행하였습니다.',
    },
    {
      id: 5,
      title: 'OO대학교 창업중심대학 창업기업 성과점검 및 컨설팅 용역',
      tags: ['컨설팅', '창업기업진단', '대학'],
      period: '2025년',
      summary: 'OO대학교 창업중심대학 선정 창업기업 70개사를 대상으로 전문가 1:1 심층 진단 및 컨설팅을 총괄 운영하였습니다. 기업별 성과 달성도 점검, 비즈니스모델 변화 진단, 차년도 성장전략 수립을 지원하고 종합 결과보고서를 작성하였습니다.',
    },
  ];


  return (
    <div className="bg-white min-h-screen">

      {/* 히어로 섹션 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-3xl md:text-4xl font-black text-white tracking-[0.15em]">컨설팅 & 강의 분야</h1>
      </section>

      {/* 프로젝트 목록 */}
      <section className="py-20 px-10 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-950 mb-3 tracking-tight">주요 수행 실적</h2>
            <p className="text-gray-400 text-sm font-light">기사단이 수행한 컨설팅·강의·연구용역 프로젝트입니다.</p>
          </div>

          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className={`rounded-2xl border border-gray-200 overflow-hidden p-6 md:p-8 hover:border-gray-400 transition-all ${project.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] text-gray-400 font-light tracking-widest uppercase border border-gray-200 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
                {/* 제목 */}
                <h3 className="text-xl font-bold text-gray-950 mb-2 leading-snug">{project.title}</h3>
                {/* 고객/기간 */}
                {project.period && (
                  <div className="text-xs text-gray-400 font-light mb-4">
                    <span>기간: {project.period}</span>
                  </div>
                )}
                {/* 요약 */}
                <p className="text-sm text-gray-500 font-light leading-relaxed break-keep">{project.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
