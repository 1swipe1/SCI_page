import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('profiles fetch error:', error);
    setUsers(data || []);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase.from('profiles').update({ approved: true }).eq('id', id);
    if (!error) setUsers((prev) => prev.map((u) => u.id === id ? { ...u, approved: true } : u));
    else alert('승인 실패: ' + error.message);
  };

  const handleRevoke = async (id) => {
    if (!window.confirm('승인을 취소하시겠습니까?')) return;
    const { error } = await supabase.from('profiles').update({ approved: false }).eq('id', id);
    if (!error) setUsers((prev) => prev.map((u) => u.id === id ? { ...u, approved: false } : u));
    else alert('취소 실패: ' + error.message);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`'${name || '이 회원'}'을(를) 삭제하시겠습니까?\n삭제된 회원은 복구할 수 없습니다.`)) return;
    const { error } = await supabase.functions.invoke('delete-user', { body: { userId: id } });
    if (!error) setUsers((prev) => prev.filter((u) => u.id !== id));
    else alert('삭제 실패: ' + error.message);
  };

  const formatDate = (iso) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const filtered = filter === 'all' ? users : filter === 'approved' ? users.filter((u) => u.approved) : users.filter((u) => !u.approved);
  const pendingCount = users.filter((u) => !u.approved).length;
  const approvedCount = users.filter((u) => u.approved).length;

  return (
    <div className="bg-white min-h-screen">

      <section className="h-[35vh] min-h-72 bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-[24px] md:text-4xl font-extrabold text-white tracking-[0.15em]">회원 관리</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/admin" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">공지 작성</Link>
          <Link to="/admin/inquiries" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">문의 관리</Link>
          <Link to="/admin/activities" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">조합 활동</Link>
        </div>
      </section>

      <section className="py-16 site-px">
        <div className="max-w-3xl mx-auto">

          {/* 상단: 통계 + 필터 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <span className="text-[13px] text-gray-400 font-light">전체 <strong className="text-gray-900 font-bold">{users.length}</strong></span>
              <span className="text-[13px] text-gray-400 font-light">승인완료 <strong className="text-gray-900 font-bold">{approvedCount}</strong></span>
              {pendingCount > 0 && (
                <span className="text-[13px] text-amber-500 font-light">대기중 <strong className="font-bold">{pendingCount}</strong></span>
              )}
            </div>
            <div className="flex gap-1.5">
              {[['all', '전체'], ['pending', '대기'], ['approved', '승인']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`px-4 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${
                    filter === val ? 'bg-gray-950 text-white' : 'border border-gray-200 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 목록 */}
          {loading ? (
            <p className="text-sm text-gray-400 font-light py-10 text-center">불러오는 중...</p>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-16 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm text-gray-300 font-light">회원이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((u) => (
                <div
                  key={u.id}
                  className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all ${
                    u.approved ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  {/* 정보 */}
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`shrink-0 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${
                      u.approved ? 'bg-gray-900 text-white' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {u.approved ? '승인' : '대기'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-gray-900 truncate">{u.full_name || '(이름 없음)'}</p>
                      <p className="text-[12px] text-gray-400 font-light mt-0.5">
                        {u.organization || '-'} · {formatDate(u.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* 버튼 */}
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    {u.approved ? (
                      <button
                        onClick={() => handleRevoke(u.id)}
                        className="px-4 py-1.5 border border-gray-200 text-gray-400 text-[12px] font-bold rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors"
                      >
                        승인 취소
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(u.id)}
                        className="px-4 py-1.5 bg-gray-950 text-white text-[12px] font-bold rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        승인
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(u.id, u.full_name)}
                      className="px-4 py-1.5 border border-gray-200 text-gray-300 text-[12px] font-bold rounded-lg hover:border-red-400 hover:text-red-400 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
