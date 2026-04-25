import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const InquiryAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from('inquiries')
      .update({ reply, replied_at: new Date().toISOString() })
      .eq('id', selected.id);

    if (!error) {
      const updated = { ...selected, reply, replied_at: new Date().toISOString() };
      setSelected(updated);
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      alert('답변이 저장되었습니다.');
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

      {/* 헤더 */}
      <section className="h-[35vh] min-h-72 bg-black flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.15em]">상담 문의 관리</h1>
      </section>

      <section className="py-16 site-px">
        <div className="max-w-6xl mx-auto flex gap-8 items-start">

          {/* 좌측: 문의 목록 */}
          <div className="w-full md:w-2/5 shrink-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-bold text-gray-950 tracking-tight">문의 목록</h2>
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
                    onClick={handleReply}
                    disabled={saving || !reply.trim()}
                    className="mt-4 px-8 py-3 bg-gray-950 text-white text-[13px] font-bold tracking-widest uppercase rounded-xl hover:bg-gray-700 transition-colors disabled:bg-gray-300"
                  >
                    {saving ? '저장 중...' : selected.reply ? '답변 수정' : '답변 저장'}
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
