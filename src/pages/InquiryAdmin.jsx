import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/* 이메일 미리보기 모달 */
const EmailPreviewModal = ({ selected, reply, onConfirm, onCancel, saving }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl">

      {/* 모달 헤더 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <p className="text-[13px] font-bold text-gray-950 tracking-tight">이메일 미리보기</p>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 이메일 미리보기 */}
      <div className="overflow-y-auto flex-1 bg-gray-100 p-4">
        <div className="bg-white max-w-[520px] mx-auto overflow-hidden text-left" style={{fontFamily:"'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif"}}>

          {/* 이메일 헤더 */}
          <div style={{backgroundColor:'#111111', padding:'24px 32px'}}>
            <p style={{margin:0, color:'#ffffff', fontSize:'11px', fontWeight:700, letterSpacing:'0.2em'}}>
              과학기술인협동조합 기술사업화지원단
            </p>
          </div>

          {/* 인사말 */}
          <div style={{padding:'32px 32px 0'}}>
            <p style={{margin:'0 0 4px', fontSize:'20px', fontWeight:700, color:'#111111', letterSpacing:'-0.5px'}}>
              문의하신 내용에 답변드립니다
            </p>
            <p style={{margin:'10px 0 0', fontSize:'13px', color:'#888888', lineHeight:1.7}}>
              안녕하세요, <strong style={{color:'#333333'}}>{selected.name || '고객'}</strong>님.<br/>
              기사단에 문의해 주셔서 감사합니다. 아래와 같이 답변 드립니다.
            </p>
          </div>

          <div style={{padding:'24px 32px 0'}}>
            <hr style={{border:'none', borderTop:'1px solid #eeeeee', margin:0}}/>
          </div>

          {/* 원본 문의 */}
          <div style={{padding:'24px 32px 0'}}>
            <p style={{margin:'0 0 8px', fontSize:'11px', fontWeight:700, color:'#aaaaaa', letterSpacing:'0.15em'}}>문의 내용</p>
            <p style={{margin:'0 0 6px', fontSize:'14px', fontWeight:700, color:'#222222'}}>{selected.subject || '(제목 없음)'}</p>
            <p style={{margin:0, fontSize:'13px', color:'#888888', lineHeight:1.8, whiteSpace:'pre-wrap'}}>{selected.message || '-'}</p>
          </div>

          <div style={{padding:'24px 32px 0'}}>
            <hr style={{border:'none', borderTop:'1px solid #eeeeee', margin:0}}/>
          </div>

          {/* 답변 */}
          <div style={{padding:'24px 32px 0'}}>
            <p style={{margin:'0 0 12px', fontSize:'11px', fontWeight:700, color:'#aaaaaa', letterSpacing:'0.15em'}}>답변</p>
            <div style={{backgroundColor:'#f8f8f8', borderLeft:'3px solid #111111', padding:'16px 20px'}}>
              <p style={{margin:0, fontSize:'14px', color:'#222222', lineHeight:1.9, whiteSpace:'pre-wrap'}}>{reply}</p>
            </div>
          </div>

          {/* 추가 문의 */}
          <div style={{padding:'24px 32px'}}>
            <p style={{margin:0, fontSize:'13px', color:'#888888', lineHeight:1.8}}>
              추가로 궁금하신 점이 있으시면 언제든지 문의해 주세요.<br/>
              <span style={{color:'#111111', fontWeight:700}}>kisadan01@naver.com</span>
            </p>
          </div>

          {/* 푸터 */}
          <div style={{backgroundColor:'#f8f8f8', padding:'16px 32px', borderTop:'1px solid #eeeeee'}}>
            <p style={{margin:0, fontSize:'11px', color:'#bbbbbb', lineHeight:1.8}}>
              본 메일은 발신 전용입니다. 직접 회신하지 마시고 위 이메일 주소로 연락주세요.<br/>
              경기도 용인시 기흥구 강남로 12, 805호 &nbsp;|&nbsp; Tel. 031-322-2357
            </p>
          </div>

        </div>
      </div>

      {/* 수신자 + 버튼 */}
      <div className="px-6 py-4 border-t border-gray-100 shrink-0">
        <p className="text-[12px] text-gray-400 font-light mb-3">
          수신: <span className="text-gray-700 font-medium">{selected.email}</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-200 text-gray-500 text-[13px] font-bold tracking-widest rounded-xl hover:border-gray-400 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="flex-1 py-3 bg-gray-950 text-white text-[13px] font-bold tracking-widest rounded-xl hover:bg-gray-700 transition-colors disabled:bg-gray-300"
          >
            {saving ? '발송 중...' : '저장 및 발송'}
          </button>
        </div>
      </div>

    </div>
  </div>
);

const InquiryAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setInquiries(data || []);
    setLoading(false);
  };

  const openInquiry = (item) => {
    setSelected(item);
    setReply(item.reply || '');
    setShowPreview(false);
  };

  const handleReply = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('inquiries')
      .update({ reply, replied_at: new Date().toISOString() })
      .eq('id', selected.id);

    if (!error) {
      const updated = { ...selected, reply, replied_at: new Date().toISOString() };
      setSelected(updated);
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));

      if (selected.email) {
        await supabase.functions.invoke('reply-inquiry', {
          body: {
            name: selected.name,
            email: selected.email,
            subject: selected.subject,
            message: selected.message,
            reply,
          },
        });
      }

      setShowPreview(false);
      alert('답변이 저장되고 이메일이 발송되었습니다.');
    } else {
      alert('저장 실패: ' + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('이 문의를 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    } else {
      alert('삭제 실패: ' + error.message);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="bg-white min-h-screen">

      {showPreview && selected && (
        <EmailPreviewModal
          selected={selected}
          reply={reply}
          onConfirm={handleReply}
          onCancel={() => setShowPreview(false)}
          saving={saving}
        />
      )}

      {/* 헤더 */}
      <section className="h-[35vh] min-h-72 bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-[24px] md:text-4xl font-extrabold text-white tracking-[0.15em]">상담 문의 관리</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/admin" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">공지 작성</Link>
          <Link to="/admin/activities" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">조합 활동</Link>
          <Link to="/admin/users" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">회원 관리</Link>
        </div>
      </section>

      <section className="py-16 site-px">
        <div className="max-w-6xl mx-auto flex gap-8 items-start">

          {/* 좌측: 문의 목록 */}
          <div className="w-full md:w-2/5 shrink-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-semibold text-gray-950 tracking-tight">문의 목록</h2>
              <span className="text-xs text-gray-400 font-light">총 {inquiries.length}건</span>
            </div>

            {loading ? (
              <p className="text-sm text-gray-400 font-light py-10 text-center">불러오는 중...</p>
            ) : inquiries.length === 0 ? (
              <p className="text-sm text-gray-400 font-light py-10 text-center">접수된 문의가 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {inquiries.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => openInquiry(item)}
                    className={`cursor-pointer rounded-xl px-5 py-4 border transition-all ${
                      selected?.id === item.id
                        ? 'border-gray-950 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-bold text-gray-900 truncate max-w-45">{item.subject || '(제목 없음)'}</span>
                      <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full ${
                        item.reply ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.reply ? '답변완료' : '미답변'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-400 font-light">
                      <span>{item.name}</span>
                      {item.organization && <><span>·</span><span>{item.organization}</span></>}
                      <span className="ml-auto">{formatDate(item.created_at)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 우측: 문의 상세 + 답변 */}
          <div className="flex-1 min-w-0">
            {!selected ? (
              <div className="flex items-center justify-center h-80 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-sm text-gray-300 font-light">문의를 선택하면 내용이 표시됩니다.</p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-2xl overflow-hidden">

                {/* 문의 정보 */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-[18px] font-bold text-gray-950">{selected.subject}</h3>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="text-[12px] text-gray-300 hover:text-red-400 transition-colors font-light ml-4 shrink-0"
                    >
                      삭제
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[13px]">
                    <div><span className="text-gray-400 font-light">이름</span> <span className="text-gray-700 ml-2">{selected.name}</span></div>
                    {selected.organization && (
                      <div><span className="text-gray-400 font-light">소속</span> <span className="text-gray-700 ml-2">{selected.organization}</span></div>
                    )}
                    {selected.phone && (
                      <div><span className="text-gray-400 font-light">연락처</span> <span className="text-gray-700 ml-2">{selected.phone}</span></div>
                    )}
                    {selected.email && (
                      <div><span className="text-gray-400 font-light">이메일</span> <span className="text-gray-700 ml-2">{selected.email}</span></div>
                    )}
                    <div><span className="text-gray-400 font-light">접수일</span> <span className="text-gray-700 ml-2">{formatDate(selected.created_at)}</span></div>
                  </div>
                </div>

                {/* 문의 내용 */}
                <div className="px-8 py-6 border-b border-gray-200">
                  <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-3">문의 내용</p>
                  <p className="text-[14px] text-gray-700 font-light leading-relaxed whitespace-pre-wrap break-keep">{selected.message}</p>
                </div>

                {/* 첨부파일 */}
                {selected.attachment_url && (
                  <div className="px-8 py-4 border-b border-gray-200">
                    <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-2">첨부파일</p>
                    <a
                      href={selected.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] text-gray-700 hover:text-gray-950 underline underline-offset-2 transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {selected.attachment_name || '첨부파일 열기'}
                    </a>
                  </div>
                )}

                {/* 답변 작성 */}
                <div className="px-8 py-6">
                  <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-3">
                    {selected.reply ? `답변 (${formatDate(selected.replied_at)})` : '답변 작성'}
                  </p>
                  <textarea
                    rows="6"
                    className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-950 outline-none transition-colors resize-none"
                    placeholder="답변 내용을 입력하세요."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    onClick={() => setShowPreview(true)}
                    disabled={!reply.trim()}
                    className="mt-4 px-8 py-3 bg-gray-950 text-white text-[13px] font-bold tracking-widest uppercase rounded-xl hover:bg-gray-700 transition-colors disabled:bg-gray-300"
                  >
                    {selected.reply ? '답변 수정 · 미리보기' : '답변 미리보기'}
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default InquiryAdmin;
