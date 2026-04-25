import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import FileDropZone from '../components/FileDropZone';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  // 수정 모드
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImportant, setEditImportant] = useState(false);
  const [editFile, setEditFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // 공지사항 로드
  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }

      setNotice(data);
      setEditTitle(data.title);
      setEditContent(data.content);
      setEditImportant(data.important ?? false);

      // 조회수 증가
      await supabase
        .from('notices')
        .update({ views: (data.views ?? 0) + 1 })
        .eq('id', id);

      setLoading(false);
    };

    fetchNotice();
  }, [id]);

  // 저장
  const handleSave = async () => {
    setSaving(true);

    let attachment_url = notice.attachment_url;
    let attachment_name = notice.attachment_name;

    if (editFile) {
      const safeName = editFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${Date.now()}_${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from('notice-attachments')
        .upload(path, editFile);
      if (uploadError) {
        alert('파일 업로드 중 오류가 발생했습니다: ' + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('notice-attachments').getPublicUrl(path);
      attachment_url = urlData.publicUrl;
      attachment_name = editFile.name;
    }

    const { error } = await supabase
      .from('notices')
      .update({ title: editTitle, content: editContent, important: editImportant, attachment_url, attachment_name })
      .eq('id', id);

    if (error) {
      alert('저장 중 오류가 발생했습니다: ' + error.message);
    } else {
      setNotice((prev) => ({ ...prev, title: editTitle, content: editContent, important: editImportant, attachment_url, attachment_name }));
      setEditFile(null);
      setEditMode(false);
    }
    setSaving(false);
  };

  // 삭제
  const handleDelete = async () => {
    if (!window.confirm('이 공지사항을 삭제하시겠습니까?')) return;

    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) {
      alert('삭제 중 오류가 발생했습니다: ' + error.message);
    } else {
      navigate('/notice');
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400">불러오는 중...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400">공지사항을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 히어로 섹션 */}
      <section className="relative h-[35vh] min-h-72 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
          alt="Notice Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-3xl md:text-4xl font-black text-white tracking-[0.15em]">공지사항</h1>
      </section>

      {/* 게시글 상세 영역 */}
      <article className="site-px mt-12">
        {/* 제목 섹션 */}
        <div className="border-t-2 border-gray-900 py-8 px-4 bg-gray-50/50">
          {editMode ? (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-2xl font-bold text-gray-900 border-b-2 border-[#1a4a9c] bg-transparent outline-none pb-1"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editImportant}
                  onChange={(e) => setEditImportant(e.target.checked)}
                  className="w-4 h-4 accent-[#1a4a9c]"
                />
                중요 공지로 표시
              </label>
            </div>
          ) : (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {notice.title}
              {notice.important && (
                <span className="ml-3 text-sm font-black bg-[#1a4a9c]/10 text-[#1a4a9c] px-3 py-1 rounded-md align-middle">
                  공지
                </span>
              )}
            </h2>
          )}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-bold text-gray-900 mr-2">조회수</span> {notice.views ?? 0}
            </div>
            {notice.date && (
              <div className="flex items-center">
                <span className="font-bold text-gray-900 mr-2">등록일</span> {notice.date}
              </div>
            )}
          </div>
        </div>

        {/* 본문 내용 */}
        <div className="py-12 px-4 border-b border-gray-100 min-h-100">
          {editMode ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={16}
              className="w-full text-lg text-gray-800 leading-relaxed border border-gray-200 rounded-xl p-4 outline-none focus:border-[#1a4a9c] focus:ring-1 focus:ring-[#1a4a9c] resize-none"
            />
          ) : (
            <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {notice.content}
            </div>
          )}
        </div>

        {/* 첨부파일 영역 */}
        {(notice.attachment_url || editMode) && (
          <div className="mt-6 px-4 py-5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-bold text-gray-600 mb-3">첨부파일</p>
            {editMode ? (
              <div>
                <FileDropZone
                  file={editFile}
                  onFileChange={setEditFile}
                  placeholder={notice.attachment_name || '파일을 선택하면 교체됩니다'}
                />
              </div>
            ) : (
              <a
                href={notice.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {notice.attachment_name || '첨부파일 다운로드'}
              </a>
            )}
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate('/notice')}
            className="px-6 py-2.5 border border-gray-950 text-gray-950 text-sm font-bold rounded-full hover:bg-gray-950 hover:text-white transition-all"
          >
            목록으로 돌아가기
          </button>

          {/* 관리자 버튼 */}
          {isAdmin && (
            <div className="flex gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded-full hover:bg-gray-100 transition-all"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {saving ? '저장 중...' : '저장'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-all"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-all"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default NoticeDetail;
