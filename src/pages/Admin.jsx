import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "../lib/supabase";

const Admin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [important, setImportant] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("제목을 입력해주세요.");

    setLoading(true);
    const { error } = await supabase
      .from('notices')
      .insert([{
        title,
        content,
        important,
        date: new Date().toISOString().split('T')[0],
        views: 0
      }]);

    setLoading(false);

    if (error) {
      alert("등록 실패: " + error.message);
    } else {
      alert("공지사항이 성공적으로 등록되었습니다.");
      setTitle('');
      setContent('');
      setImportant(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">

      {/* 히어로 섹션 */}
      <section className="h-[35vh] min-h-72 bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.15em]">공지사항 작성</h1>
        <Link
          to="/admin/inquiries"
          className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full"
        >
          상담 문의 관리
        </Link>
      </section>

      {/* 작성 폼 */}
      <section className="py-20 px-[15.625%]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 제목 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">제목</label>
              <input
                type="text"
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-gray-950 transition-all"
                placeholder="공지사항 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">내용</label>
              <textarea
                rows="10"
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-gray-950 transition-all resize-none"
                placeholder="상세 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* 중요 공지 */}
            <div className="flex items-center gap-3 py-4 border-t border-gray-100">
              <input
                type="checkbox"
                id="important"
                className="w-4 h-4 cursor-pointer"
                checked={important}
                onChange={() => setImportant(!important)}
              />
              <label htmlFor="important" className="text-sm font-medium text-gray-700 cursor-pointer">
                상단 중요 공지로 고정
              </label>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all ${
                loading
                  ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-950 text-white hover:bg-gray-700'
              }`}
            >
              {loading ? '등록 중...' : '공지사항 게시하기'}
            </button>

          </form>
        </div>
      </section>

    </div>
  );
};

export default Admin;
