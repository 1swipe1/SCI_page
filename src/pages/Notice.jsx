import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../lib/supabase";
import { useAuth } from '../context/AuthContext';
import FileDropZone from '../components/FileDropZone';

const Notice = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 글 작성 모달
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImportant, setNewImportant] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('important', { ascending: false })
        .order('date', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 글 작성
  const handleWrite = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    setSubmitting(true);

    let attachment_url = null;
    let attachment_name = null;

    if (newFile) {
      const safeName = newFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${Date.now()}_${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from('notice-attachments')
        .upload(path, newFile);
      if (uploadError) {
        alert('파일 업로드 중 오류가 발생했습니다: ' + uploadError.message);
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('notice-attachments').getPublicUrl(path);
      attachment_url = urlData.publicUrl;
      attachment_name = newFile.name;
    }

    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    const { error } = await supabase.from('notices').insert({
      title: newTitle.trim(),
      content: newContent.trim(),
      important: newImportant,
      date: today,
      views: 0,
      attachment_url,
      attachment_name,
    });

    if (error) {
      alert('등록 중 오류가 발생했습니다: ' + error.message);
    } else {
      setShowWriteModal(false);
      setNewTitle('');
      setNewContent('');
      setNewImportant(false);
      setNewFile(null);
      await fetchNotices();
    }
    setSubmitting(false);
  };

  // 삭제
  const handleDelete = async (e, noticeId) => {
    e.stopPropagation();
    if (!window.confirm('이 공지사항을 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('notices').delete().eq('id', noticeId);
    if (error) {
      alert('삭제 중 오류가 발생했습니다: ' + error.message);
    } else {
      setNotices((prev) => prev.filter((n) => n.id !== noticeId));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 상단 히어로 섹션 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-3xl md:text-4xl font-extrabold text-white tracking-[0.15em]">
          공지사항
        </h1>
      </section>

      {/* 게시판 본문 섹션 */}
      <section className="py-16 site-px">
        {/* 상단 검색 및 정보 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-sm text-gray-500">
            총 <span className="font-bold text-gray-900">{notices.length}</span>건의 게시물이 있습니다.
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4a9c] focus:ring-1 focus:ring-[#1a4a9c] transition-all"
              />
              <button className="absolute right-4 top-3 text-gray-400 hover:text-[#1a4a9c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowWriteModal(true)}
                className="shrink-0 px-5 py-3 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
              >
                글 작성
              </button>
            )}
          </div>
        </div>

        {/* 게시판 테이블 영역 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t-2 border-gray-900">
            <thead>
              <tr className="bg-gray-50 text-sm font-bold text-gray-700 border-b border-gray-200">
                <th className="px-6 py-5 w-24 text-center">번호</th>
                <th className="px-6 py-5">제목</th>
                <th className="px-6 py-5 w-24 text-center">조회수</th>
                {isAdmin && <th className="px-6 py-5 w-28 text-center">관리</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={isAdmin ? 4 : 3} className="py-20 text-center text-gray-400">데이터를 불러오는 중입니다...</td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 4 : 3} className="py-20 text-center text-gray-400">등록된 공지사항이 없습니다.</td>
                </tr>
              ) : (
                notices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    onClick={() => navigate(`/notice/${notice.id}`)}
                    className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-5 text-center">
                      {notice.important ? (
                        <span className="inline-block bg-red-50 text-red-500 text-xs font-black px-3 py-1 rounded-md">
                          공지
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400 font-medium">
                          {notices.length - index}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-base tracking-tight ${notice.important ? 'font-bold text-gray-900' : 'text-gray-700'} group-hover:text-black transition-colors`}>
                        {notice.title}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center text-sm text-gray-400 font-medium">
                      {notice.views || 0}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/notice/${notice.id}`)}
                            className="px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, notice.id)}
                            className="px-3 py-1.5 text-xs font-bold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="mt-12 flex justify-center space-x-2">
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition-all">
            &lt;
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg font-bold shadow-md">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition-all">
            &gt;
          </button>
        </div>
      </section>

      {/* 글 작성 모달 */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">공지사항 작성</h2>
              <button
                onClick={() => setShowWriteModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleWrite} className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="제목을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4a9c] focus:ring-1 focus:ring-[#1a4a9c] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  rows={10}
                  placeholder="내용을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a4a9c] focus:ring-1 focus:ring-[#1a4a9c] transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">첨부파일</label>
                <FileDropZone file={newFile} onFileChange={setNewFile} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newImportant}
                  onChange={(e) => setNewImportant(e.target.checked)}
                  className="w-4 h-4 accent-[#1a4a9c]"
                />
                <span className="text-sm text-gray-600 font-medium">중요 공지로 표시</span>
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded-full hover:bg-gray-100 transition-all"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {submitting ? '등록 중...' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
