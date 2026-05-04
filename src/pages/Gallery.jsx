import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};

const Gallery = () => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState('business');
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    if (hash === '#lecture') {
      setActiveTab('lecture');
    } else {
      setActiveTab('business');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [hash]);

  useEffect(() => {
    const fetchActivities = async () => {
      setActivitiesLoading(true);
      const { data } = await supabase
        .from('activities')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });
      setActivities(data || []);
      setActivitiesLoading(false);
    };
    fetchActivities();
  }, []);

  const lectureItems = [
    {
      id: 1,
      category: '기술창업 및 사업화',
      title: '기술창업, 기술사업화와\n기술가치 평가',
      desc: '기술 기반 창업의 전 과정을 체계적으로 지원합니다. 아이디어 발굴 단계부터 사업타당성 분석, 기술가치평가, 기술사업화 전략 수립까지 각 단계에 맞는 전문 컨설팅을 제공합니다. 기술의 시장성과 사업성을 면밀히 검토하고, 실행 가능한 사업화 로드맵을 함께 설계합니다.',
    },
    {
      id: 2,
      category: '신규사업 아이템 발굴',
      title: '신규 아이템 발굴 및\n사업성 분석',
      desc: '기업의 기술역량, 보유 자원, 시장 환경을 종합적으로 분석하여 실현 가능한 신규 아이템을 발굴합니다. 경쟁사 분석과 트렌드 조사를 바탕으로 차별화된 포지셔닝 전략을 수립하고, 브랜드 확장 가능성과 수익 모델을 함께 검토하여 지속 가능한 성장 방향을 제시합니다.',
    },
    {
      id: 3,
      category: '사업타당성 분석',
      title: '창업기업의\n사업타당성 분석',
      desc: '객관적인 데이터 기반의 사업타당성 분석으로 창업기업이 확실한 근거 위에서 전략적 의사결정을 내릴 수 있도록 지원합니다. 시장 규모 및 성장성, 경쟁 환경, 수익성 시뮬레이션을 포함한 종합 분석 보고서를 제공하며, 투자자 및 금융기관 제출용 자료 작성도 지원합니다.',
    },
    {
      id: 4,
      category: 'R&D 전략 수립',
      title: '연구개발\n중장기 전략 수립',
      desc: '업종별 맞춤형 R&D 중장기 전략 수립과 기술 로드맵, 특허 포트폴리오 구성을 통해 기업의 미래 기술력을 체계적으로 설계합니다. 정부 R&D 과제 연계 전략과 산학연 협력 네트워크 구축까지 지원하여, 기술 경쟁력 확보와 사업화 성과를 동시에 달성할 수 있도록 돕습니다.',
    },
    {
      id: 5,
      category: '기업가정신 및 리더십',
      title: '기업가정신·리더십\n교육 프로그램',
      desc: '기업가정신, 디자인씽킹, 해커톤, 리더십 등 실무 중심의 맞춤형 교육을 대학·공공기관·기업 대상으로 설계하고 운영합니다. 단순 강의에 그치지 않고 실습, 팀 프로젝트, 현장 사례 연구를 결합한 몰입형 커리큘럼으로 참여자의 실질적인 역량 향상을 이끌어냅니다.',
    },
    {
      id: 6,
      category: '정책자금 및 인증지원',
      title: '정책자금 및\n각종 인증 지원',
      desc: '국가전문자격 경영지도사가 정책자금 정보 제공과 신청 지원, 벤처기업·이노비즈·메인비즈 등 각종 인증 획득까지 체계적으로 지원합니다. 기업 상황에 맞는 정부지원사업을 탐색하고 신청서 작성부터 심사 대응까지 전 과정을 밀착 지원하여 자금 확보 가능성을 높입니다.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* 히어로 섹션 — Members와 동일 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-3xl md:text-4xl font-extrabold text-white tracking-[0.15em]">{activeTab === 'business' ? '사업 분야 소개' : '조합 활동'}</h1>
      </section>

      {/* 탭 네비게이션 */}
      <nav className="bg-black text-white border-b border-white/10 h-10">
        <div className="max-w-360 mx-auto flex h-full items-stretch">
          <button
            onClick={() => setActiveTab('business')}
            className={`flex-1 h-full flex items-center justify-center text-[13px] md:text-[14px] font-black transition-all bg-black ${
              activeTab === 'business' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            사업 분야 소개
          </button>
          <button
            onClick={() => setActiveTab('lecture')}
            className={`flex-1 h-full flex items-center justify-center text-[13px] md:text-[14px] font-black transition-all bg-black ${
              activeTab === 'lecture' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            조합 활동
          </button>
        </div>
      </nav>

      {/* 콘텐츠 */}
      {activeTab === 'lecture' ? (
        <section data-section="gallery-lecture" className="py-16 px-6">
          <style>{`@media (min-width: 768px) { [data-section="gallery-lecture"] { padding-top: 125px; padding-bottom: 125px; padding-left: 420px; padding-right: 420px; } }`}</style>

          <div className="text-center mb-16">
            <h2 className="text-[24px] md:text-[32px] font-semibold text-gray-950 mb-1 tracking-tighter">조합의 지난 활동</h2>
            <p className="text-[14px] md:text-[16px] text-gray-400 font-light">기사단이 수행한 컨설팅·강의·연구용역 프로젝트</p>
          </div>

          {activitiesLoading ? (
            <p className="text-sm text-gray-400 font-light py-10 text-center">불러오는 중...</p>
          ) : activities.length === 0 ? (
            <p className="text-sm text-gray-300 font-light py-10 text-center">등록된 활동이 없습니다.</p>
          ) : (
            chunkArray(activities, 3).map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-col md:flex-row justify-center" style={{gap: '15px', marginBottom: rowIdx < chunkArray(activities, 3).length - 1 ? '40px' : '0'}}>
                {row.map((project) => (
                  <div key={project.id} className="flex flex-col">
                    {/* 이미지 */}
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full md:w-87.5 object-cover" style={{height: '230px', marginBottom: '10px'}} />
                    ) : (
                      <div className="bg-gray-200 w-full md:w-87.5" style={{height: '230px', marginBottom: '10px'}} />
                    )}
                    {/* 텍스트 영역 */}
                    <div className="flex flex-col w-full md:w-82.5" style={{height: '300px', overflow: 'hidden', paddingTop: '10px', paddingBottom: '10px'}}>
                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1.5 mb-3.75">
                        {project.tags?.map((tag, i) => (
                          <span key={i} className="text-[12px] font-light tracking-widest uppercase" style={{ color: '#7C7C7C' }}>{tag}{i < project.tags.length - 1 && ' ·'}</span>
                        ))}
                      </div>
                      {/* 제목 + 구분선 */}
                      <div className="border-b border-gray-300 mb-4" style={{paddingBottom: '15px'}}>
                        <div className="flex items-center" style={{height: '47px'}}>
                          <h3 className="text-[17px] font-bold leading-snug whitespace-pre-line" style={{ color: '#111111' }}>{project.title}</h3>
                        </div>
                      </div>
                      {/* 요약 */}
                      <p className="text-[16px] font-light leading-relaxed break-all flex-1 text-justify overflow-hidden" style={{ color: '#7C7C7C' }}>{project.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </section>
      ) : (
        <section className="site-px py-16 md:py-0" data-section="gallery-business">
          <style>{`@media (min-width: 768px) { [data-section="gallery-business"] { padding-top: 125px; padding-bottom: 125px; } }`}</style>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[24px] md:text-[32px] font-semibold text-gray-950 mb-1 tracking-tighter">사업 분야 소개</h2>
              <p className="text-[14px] md:text-[16px] text-gray-400 font-light">어떤 일을 하는지, 간략하게 요약하는 페이지</p>
            </div>

            <div className="space-y-8">
              {lectureItems.map((item, index) => (
                <div key={item.id} style={index % 2 !== 0 ? { backgroundColor: '#F3F4F6' } : {}} className="rounded-2xl border border-gray-200 overflow-hidden p-10 md:p-12">
                  <div className="flex items-center gap-6 mb-8">
                    <p className="text-xs text-gray-400 font-light tracking-widest shrink-0">{item.category}</p>
                    <hr className="border-gray-300 flex-1" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                    <div className="md:w-2/5 shrink-0">
                      <h3 className="text-xl md:text-2xl font-black text-gray-950 leading-snug whitespace-pre-line">{item.title}</h3>
                    </div>
                    <div className="md:w-3/5 flex flex-col justify-center">
                      <p className="text-[15px] md:text-[14px] text-gray-950  font-light leading-6 mb-10 break-all">{item.desc}</p>
                      <Link to="/business" className="inline-block self-start px-4 py-2.5 text-gray-950 text-xs font-bold tracking-widest uppercase rounded-full border border-gray-950 hover:bg-gray-950 hover:text-white transition-all">
                        VIEW MORE
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
