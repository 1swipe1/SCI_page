import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* --- 기획안 §11 사업분야 6개 --- */
const businessAreas = [
  {
    tab: '기술창업 및 사업화',
    subtitle: '기술창업, 기술사업화와 기술가치 평가',
    quote: '기술 기반의 창업 성공의 핵심 요인, 철저한 사업 타당성 분석에서 시작해야',
    questionCard: '내가 가진 기술을 가지고 사업을 하고 싶은데… 해도 되는 걸까? 성공 가능성이 얼마나 있는 것일까?',
    paragraphs: [
      '기술을 통한 창업은 기술 아이템에 대한 철저한 시장분석을 통하여 기술의 경제적 가치 창출 유무를 검증하고 시장진입 전략이 함께 수립되어야 보다 성공적인 기술창업이 이루어질 수 있습니다.',
      '이러한 일련의 과정은 비즈니스 모델 수립 과정을 통한 철저한 사업 타당성 검증이 필요합니다. 그리고 비즈니스 모델을 통한 기술 창업 기업의 가치를 담아낼 수 있는 기술사업화 사업계획서의 작성이 무엇보다 중요합니다.',
      '기술사업화지원단은 기술창업 분야의 오랜 전문 인력을 통하여 업종별 기술창업과 사업화를 지원해 드립니다.',
      '많은 기업들이 끊임없는 기술 개발을 통하여 수많은 자체 개발 기술을 보유하고 있고 대부분 독점적 권리확보를 위해 자사가 개발한 기술을 산업재산권으로 출원 및 등록합니다.',
      '그런데, 특허를 많이 보유한 기업이라고 해서 반드시 기술력이 우수한 기업이라고 할 수는 없습니다. 진정한 기술이란, 제품화나 상품화에 응용하여 부가적인 경제적 가치를 창출하거나, 생산 공정에 반영되어 수율을 향상시키는 등 원가를 절감하는 실질적 경제적 효과가 있어야 합니다.',
      '기술사업화지원단에서는 회사의 M&A, 기술담보 제공 등 필요시 기업이 보유한 기술가치의 평가서를 KCVA(Korea Certified Valuation Analyst: 한국 기업·기술가치평가사)의 적격하고 객관적 평가를 통해 작성해 드립니다.',
      '또한, 기업이 독자적으로 개발한 기술을 사업화하고자 할 경우, 기술사업화에 대한 구체적 전략수립을 지원해 드립니다. 기술사업화 전략 수립은 해당 기업의 기술 유형에 따라 전문가와 TCC(Technology Commercialization Coordinator)의 체계적인 컨설팅 활동을 통하여 이루어집니다.',
    ],
  },
  {
    tab: '신규사업 아이템 발굴',
    subtitle: '신규 아이템 발굴 및 사업성 분석',
    quote: '신규 아이템을 발굴, 브랜드 확장',
    paragraphs: [
      '회사의 제품은 현재 주력 제품으로 매출액의 큰 비중을 차지하는 제품군과 미래에 현재의 주력 제품을 대체하기 위해 개발 중인 신제품군, 그리고 기존에 개발한 제품이지만 이미 시장에서 사양길로 접어든 제품군, 앞으로 수요가 많이 발생할 것이라고 예측되지만 불확실한 제품군 등으로 나뉠 수 있습니다.',
      'BCG 매트릭스 분석은 기업이 제조 또는 판매하는 이러한 제품군들을 시장 성장률과 시장 점유율에 따라 분석해 보는 것을 말합니다.',
      '회사는 자사 제품의 PLC(Product Life Cycle)와 제품의 외부적인 수요변화와 경쟁관계를 늘 분석하고 이를 통하여 새로운 트렌드에 맞는 아이템을 끊임없이 개발해야 합니다.',
      '때문에 제품 브랜드 확장 전략(Brand Extension Strategy)을 고민해야 할 뿐만 아니라, 회사의 인적, 기술적, 재정적 자원을 바탕으로 지금 상태에서 어떠한 신규 아이템을 발굴할 수 있는지 전략을 수립하여야 합니다.',
      '기술사업화지원단은 기업의 기술역량과 시장 환경을 종합적으로 분석하여, 실현 가능한 신규 아이템 발굴과 사업성 검증을 체계적으로 지원합니다.',
    ],
  },
  {
    tab: '사업타당성 분석',
    subtitle: '창업기업의 사업타당성 분석',
    quote: '주관적인 직관에 의존하기보다는 객관적인 분석과 체계적인 전략수립이 필요',
    questionCard: '내가 생각하는 창업 아이템이 과연 사업성이 있는 것일까? 그리고 어떠한 방식으로 창업을 하여야 할까? 구체적인 절차는 어떻게 될까?',
    paragraphs: [
      '사업 아이템을 발굴하고 창업을 결심하기까지는 많은 고민과 경영 시뮬레이션 및 객관적인 차원에서의 사업성 검토가 필요합니다.',
      '많은 창업기업이 5년을 넘기지 못하고 실패하는 사례가 많은 것은, 창업 준비단계에서 철저한 사업성 분석과 창업 단계별 전략을 수립하고 이행하지 못한 결과로 볼 수 있습니다.',
      '창업 아이템의 시장 분석과 사업성 검토, 전략수립에 이르기까지 창업자 본인만의 주관적 시각에서 벗어나 객관적인 데이터를 기반으로 사업전략을 수립해 줄 전문가와 상의하고 협업해야 합니다.',
      '뿐만 아니라, 이미 사업을 운영하고 있는 기업도 현재의 수익률을 유지하고 있는지, 현 상태에서 앞으로 예상되는 사업전망이 어떤지 수시로 점검하고 검토할 필요가 있습니다.',
      '기술사업화지원단은 기업 단계별 맞춤 진단과 데이터 기반 사업타당성 분석을 통해, 창업기업이 보다 확실한 근거 위에서 전략적 의사결정을 내릴 수 있도록 지원합니다.',
    ],
  },
  {
    tab: 'R&D 전략 수립',
    subtitle: '연구개발 중장기 전략 수립',
    quote: '업종별 맞춤형 연구개발 중장기 전략수립, 기업의 미래 기술력 판단의 핵심 평가요소',
    paragraphs: [
      '기업의 현재를 책임지고 있는 것이 지속적인 매출증가와 건전한 경영구조라면, 기업의 미래를 책임지는 것은 지속적인 연구개발 활동이라고 할 수 있습니다.',
      '특히 중소기업은 부단한 기술혁신을 통하여 차별화된 제품으로 성장해 나갈 때만, 규모의 경제가 지배하는 시장에서 계속기업으로서의 영속성을 담보할 수 있게 됩니다.',
      '이러한 중장기 연구개발 전략과 로드맵은 각종 정책자금 지원 또는 금융권을 통한 자금 확보 시 기업의 현재와 미래의 기술력을 판단하는 중요한 평가 요소 중 하나이기도 합니다.',
      '하지만, 회사 내부의 연구전담 인력만으로는 때때로 중장기적인 연구개발 전략을 수립하고 구체적인 단계별 로드맵을 작성하여 회사의 미래 경영의 핵심 축을 그려나가기에는 여러 가지 현실적인 한계에 부딪히는 경우가 많습니다.',
      '기술사업화지원단에서는 각 기업의 업종별 R&D 전략 수립과 단계별 기술개발, 특허 포트폴리오 구성, 기술 로드맵 작성을 위한 업종별 맞춤형 연구개발 중장기 전략 수립을 도와드립니다.',
    ],
  },
  {
    tab: '기업가정신 및 리더십',
    subtitle: '기업가정신·리더십 교육 프로그램',
    quote: '변화를 이끄는 힘은 기술이 아니라 사람에게서 나옵니다',
    paragraphs: [
      '급변하는 경영환경 속에서 조직의 지속가능한 성장을 이끄는 핵심 역량은 구성원의 기업가적 마인드셋과 리더십입니다.',
      '기술사업화지원단은 대학, 공공기관, 창업지원기관, 기업을 대상으로 실무 중심의 맞춤형 교육 프로그램을 설계하고 운영합니다. 단순한 이론 전달이 아닌, 참여자가 직접 경험하고 실행하는 워크숍 방식을 통해 체화된 역량을 길러드립니다.',
    ],
    bulletSections: [
      {
        heading: '주요 교육 분야',
        items: [
          '기업가정신(Entrepreneurship): 기회 포착, 문제 정의, 가치 창출의 사고 체계를 훈련합니다.',
          '디자인씽킹(Design Thinking): 고객 공감 → 문제 정의 → 아이디어 도출 → 프로토타이핑 → 테스트의 5단계 프로세스를 실습 중심으로 진행합니다.',
          '해커톤(Hackathon): 제한된 시간 내에 팀 단위로 아이디어를 구체화하고 결과물을 만들어내는 집중 워크숍을 기획·운영합니다.',
          '리더십·커뮤니케이션: 조직 내 소통 역량 강화, 코칭 리더십, 갈등 관리 등 현장 밀착형 리더십 교육을 제공합니다.',
        ],
      },
      {
        heading: '교육 운영 특장점',
        items: [
          '前 청년창업사관학교 코칭팀장, 인증코치(KPC), 대학 겸임교수 등 현장 경험이 풍부한 전문가가 직접 강의',
          '기관/기업의 교육 목적과 참여자 수준에 맞춘 맞춤형 커리큘럼 설계',
          '강의, 워크숍, 멘토링을 결합한 블렌디드 러닝 방식 운영 가능',
        ],
      },
    ],
  },
  {
    tab: '정책자금 및 인증지원',
    subtitle: '정책자금 및 각종 인증 지원',
    quote: '우리 회사에 최적화된 정부지원사업 안내와 각종 인증 획득을 전문적으로 지원합니다',
    paragraphs: [
      '정부와 지방자치단체는 해마다 중소기업 및 창업기업에 대한 각종 지원정책과 시책을 발표합니다.',
      '하지만 막상 우리 회사에 적합한 정부 지원 정책을 찾아서 지원을 신청하려니 도대체 어느 기관에서 어떠한 지원 정책이 언제 공고되어 시행되는지 알아보기가 쉽지 않습니다.',
      '더구나 어렵게 찾아낸 정부 지원금을 신청하려 하면 준비해야 할 서류와 항목들도 만만치 않습니다. 정책자금 신청 후에 실사를 대비해서 준비해야 하는 항목이 무엇인지도 궁금합니다.',
      '또한, 정책자금 신청 등에 가산점과 각종 혜택이 부여되는 벤처기업인증, 이노비즈 인증, 신기술 인증, 유망 중소기업 인증, 환경인증, 품질인증 등 수많은 인증제도와 관련하여 준비와 신청, 진행절차 등을 전문적으로 지원해 줄 곳이 필요합니다.',
      '경영지도사는 「중소기업진흥에 관한 법률」 제47조 및 동법 시행령 제43조에 의하여 정부의 정책지원 시책을 준비하고 관련 업무를 합법적으로 대행할 수 있는 유일한 공인 자격 컨설턴트입니다.',
      '기술사업화지원단은 국가전문자격 경영지도사로 구성된 전문 컨설턴트가 각종 정책자금의 정보 제공, 신청 지원, 유망한 인증서 획득까지 체계적으로 도와드립니다. 내부 인력의 업무공백 없이, 합리적인 비용으로 전문적인 지원을 받으실 수 있습니다.',
    ],
  },
];

const BusinessDetail = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);
  const area = businessAreas[activeSubTab];

  return (
    <div className="bg-white min-h-screen">

      {/* 히어로 배너 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center">
          <p className="text-white/60 text-sm font-light tracking-[0.2em] mb-2">사업 분야 소개</p>
          <h1 className="text-[20px] md:text-4xl font-black text-white tracking-tight break-keep">
            {area.subtitle}
          </h1>
        </div>
      </section>

      {/* 본문 */}
      <section className="pt-11 pb-36 site-px">
        <div className="max-w-5xl mx-auto">

          {/* 뒤로가기 */}
          <div className="mb-8">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-950 text-[13px] font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              사업 분야 소개로 돌아가기
            </Link>
          </div>

          {/* 서브 탭바 */}
          <div className="overflow-x-auto mb-14 -mx-6 md:mx-0 scrollbar-hide">
            <div className="flex min-w-max md:min-w-0 px-6 md:px-0">
              {businessAreas.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSubTab(idx)}
                  className={`shrink-0 md:flex-1 px-4 pt-1 pb-4 text-[12px] md:text-[13px] font-medium transition-all whitespace-nowrap bg-white border-t-2 ${
                    activeSubTab === idx
                      ? 'border-gray-950 text-gray-950'
                      : 'border-gray-300 text-gray-400 hover:border-gray-950 hover:text-gray-950'
                  }`}
                >
                  {item.tab}
                </button>
              ))}
            </div>
          </div>

          {/* 인용문 */}
          <div className="py-6 mb-10 text-center md:bg-gray-100 md:rounded-xl md:px-10 md:py-8">
            <p className="text-gray-700 font-medium leading-relaxed text-base md:text-lg break-keep">
              "{area.quote}"
            </p>
          </div>

          {/* 질문 카드 (있을 경우) */}
          {area.questionCard && (
            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base italic mb-10 text-center break-keep">
              {area.questionCard}
            </p>
          )}

          {/* 본문 */}
          <div className="text-gray-700 leading-6 text-[14px] md:text-[15px] font-light break-keep space-y-6">
            {area.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* 불릿 섹션 (기업가정신 탭 등) */}
          {area.bulletSections && (
            <div className="mt-8 space-y-8">
              {area.bulletSections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-[14px] md:text-[15px] font-bold text-gray-900 mb-3">{section.heading}</h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-gray-700 text-[14px] md:text-[15px] font-light leading-relaxed break-keep flex items-start gap-2.5">
                        <span className="shrink-0 mt-0.5 text-gray-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default BusinessDetail;
