import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const MyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetchMyInquiries();
  }, [user]);

  const fetchMyInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('email', user.email)
      .order('created_at', { ascending: false });

    if (!error) setInquiries(data || []);
    setLoading(false);
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('activeSession');
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen">

      {/* 헤더 */}
      <section className="h-[35vh] min-h-72 bg-black flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.15em]">MY PAGE</h1>
      </section>

      <section className="py-16 site-px">
        <div className="max-w-4xl mx-auto">

          {/* 계정 정보 */}
          <div className="bg-gray-50 rounded-2xl px-8 py-7 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-1">계정 정보</p>
              <p className="text-[18px] font-bold text-gray-950">{user?.email}</p>
              <p className="text-[13px] text-gray-400 font-light mt-1">가입일 {formatDate(user?.created_at)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="self-start md:self-auto px-6 py-2.5 border border-gray-300 text-gray-500 text-[13px] font-bold tracking-widest uppercase rounded-full hover:border-red-400 hover:text-red-400 transition-all"
            >
              LOGOUT
            </button>
          </div>

          {/* 문의 내역 */}
          <div>
            <h2 className="text-[18px] font-bold text-gray-950 tracking-tight mb-5">나의 문의 내역</h2>

            {loading ? (
              <p className="text-sm text-gray-400 font-light py-10 text-center">불러오는 중...</p>
            ) : inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-sm text-gray-300 font-light">접수된 문의가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((item) => (
                  <div key={item.id}>
                    <div
                      onClick={() => setSelected(selected?.id === item.id ? null : item)}
                      className={`cursor-pointer rounded-xl border px-6 py-4 transition-all ${
                        selected?.id === item.id ? 'border-gray-950 bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold text-gray-900 truncate max-w-xs">{item.subject || '(제목 없음)'}</span>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full ${
                            item.reply ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {item.reply ? '답변완료' : '답변대기'}
                          </span>
                          <span className="text-[12px] text-gray-400 font-light">{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 펼치기 */}
                    {selected?.id === item.id && (
                      <div className="border border-t-0 border-gray-200 rounded-b-xl overflow-hidden">
                        {/* 문의 내용 */}
                        <div className="px-6 py-5 border-b border-gray-100">
                          <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">문의 내용</p>
                          <p className="text-[14px] text-gray-700 font-light leading-relaxed whitespace-pre-wrap break-keep">{item.message}</p>
                          {item.attachment_url && (
                            <a
                              href={item.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-3 text-[12px] text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {item.attachment_name || '첨부파일'}
                            </a>
                          )}
                        </div>
                        {/* 답변 */}
                        <div className="px-6 py-5 bg-gray-50">
                          <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">
                            {item.reply ? `답변 · ${formatDate(item.replied_at)}` : '답변'}
                          </p>
                          {item.reply ? (
                            <p className="text-[14px] text-gray-700 font-light leading-relaxed whitespace-pre-wrap break-keep">{item.reply}</p>
                          ) : (
                            <p className="text-[13px] text-gray-300 font-light">아직 답변이 등록되지 않았습니다.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default MyPage;
