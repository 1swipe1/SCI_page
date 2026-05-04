import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ActivityForm = ({ initial, onSave, onCancel }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [tagsInput, setTagsInput] = useState(initial?.tags?.join(', ') || '');
  const [summary, setSummary] = useState(initial?.summary || '');
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);

    let image_url = initial?.image_url || null;

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('activity-images')
        .upload(path, imageFile);
      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('activity-images')
          .getPublicUrl(path);
        image_url = urlData.publicUrl;
      }
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    await onSave({ title, tags, summary, image_url }, initial?.id);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <p className="text-[13px] font-bold text-gray-950 tracking-tight">
            {initial ? '활동 수정' : '활동 추가'}
          </p>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">제목</label>
            <textarea
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="줄바꿈은 Enter로 입력"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-950 outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">태그</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="쉼표로 구분  예) 컨설팅, BM분석, 스타트업"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-950 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">요약</label>
            <textarea
              rows={5}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="활동 내용을 간략히 설명해주세요."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-950 outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">이미지</label>
            {initial?.image_url && !imageFile && (
              <img src={initial.image_url} alt="현재 이미지" className="w-full h-36 object-cover rounded-xl mb-3" />
            )}
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="미리보기" className="w-full h-36 object-cover rounded-xl mb-3" />
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 border border-gray-200 text-[12px] text-gray-500 font-bold rounded-xl hover:border-gray-400 transition-colors"
            >
              {imageFile ? '다른 이미지 선택' : initial?.image_url ? '이미지 변경' : '이미지 선택'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-200 text-gray-500 text-[13px] font-bold tracking-widest rounded-xl hover:border-gray-400 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="flex-1 py-3 bg-gray-950 text-white text-[13px] font-bold tracking-widest rounded-xl hover:bg-gray-700 transition-colors disabled:bg-gray-300"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>

      </div>
    </div>
  );
};

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('activities')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });
    setActivities(data || []);
    setLoading(false);
  };

  const handleSave = async (payload, id) => {
    if (id) {
      const { error } = await supabase.from('activities').update(payload).eq('id', id);
      if (!error) {
        setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, ...payload } : a)));
      } else {
        alert('수정 실패: ' + error.message);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from('activities')
        .insert([{ ...payload, display_order: activities.length }])
        .select()
        .single();
      if (!error) {
        setActivities((prev) => [...prev, data]);
      } else {
        alert('추가 실패: ' + error.message);
        return;
      }
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('이 활동을 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) {
      setActivities((prev) => prev.filter((a) => a.id !== id));
      if (editing?.id === id) { setEditing(null); setShowForm(false); }
    } else {
      alert('삭제 실패: ' + error.message);
    }
  };

  const moveItem = async (index, direction) => {
    const next = [...activities];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setActivities(next);
    await Promise.all(
      next.map((a, i) => supabase.from('activities').update({ display_order: i }).eq('id', a.id))
    );
  };

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (item) => { setEditing(item); setShowForm(true); };

  return (
    <div className="bg-white min-h-screen">

      {showForm && (
        <ActivityForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <section className="h-[35vh] min-h-72 bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-[24px] md:text-4xl font-extrabold text-white tracking-[0.15em]">조합 활동 관리</h1>
        <div className="flex gap-4">
          <Link to="/admin" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">공지 작성</Link>
          <Link to="/admin/inquiries" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">문의 관리</Link>
          <Link to="/admin/users" className="px-6 py-2.5 border border-white/30 text-white/70 text-[13px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all rounded-full">회원 관리</Link>
        </div>
      </section>

      <section className="py-16 site-px">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[18px] font-semibold text-gray-950 tracking-tight">활동 목록</h2>
              <p className="text-xs text-gray-400 font-light mt-1">총 {activities.length}건 · 순서는 ▲▼로 조정</p>
            </div>
            <button
              onClick={openAdd}
              className="px-6 py-2.5 bg-gray-950 text-white text-[13px] font-bold tracking-widest rounded-xl hover:bg-gray-700 transition-colors"
            >
              + 추가
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 font-light py-10 text-center">불러오는 중...</p>
          ) : activities.length === 0 ? (
            <div className="flex items-center justify-center py-20 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm text-gray-300 font-light">등록된 활동이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-center border border-gray-200 rounded-xl p-4 hover:border-gray-400 transition-all">

                  {/* 이미지 */}
                  <div className="shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-20 h-14 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-gray-900 whitespace-pre-line leading-snug mb-1">{item.title}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {item.tags?.map((tag, i) => (
                        <span key={i} className="text-[11px] text-gray-400 font-light">
                          {tag}{i < item.tags.length - 1 && ' ·'}
                        </span>
                      ))}
                    </div>
                    <p className="text-[12px] text-gray-400 font-light line-clamp-1">{item.summary}</p>
                  </div>

                  {/* 버튼 */}
                  <div className="shrink-0 flex flex-col gap-1.5">
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveItem(index, -1)}
                        disabled={index === 0}
                        className="text-[11px] px-2.5 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 disabled:opacity-25 transition-colors"
                      >▲</button>
                      <button
                        onClick={() => moveItem(index, 1)}
                        disabled={index === activities.length - 1}
                        className="text-[11px] px-2.5 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 disabled:opacity-25 transition-colors"
                      >▼</button>
                    </div>
                    <button
                      onClick={() => openEdit(item)}
                      className="text-[12px] text-gray-500 hover:text-gray-950 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors font-bold"
                    >수정</button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[12px] text-gray-300 hover:text-red-400 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                    >삭제</button>
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

export default AdminActivities;
