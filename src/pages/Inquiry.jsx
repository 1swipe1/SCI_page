import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import FileDropZone from '../components/FileDropZone';

const Inquiry = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, organization')
        .eq('id', user.id)
        .single();
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
        name: data?.full_name || '',
        organization: data?.organization || '',
      }));
    };
    fetchProfile();
  }, [user]);

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const validateEmail = (value) => {
    if (!value) return '';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '올바른 이메일 형식을 입력해주세요.';
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    if (emailError) { setErrors({ email: emailError }); return; }
    setIsSubmitting(true);

    let attachment_url = null;
    let attachment_name = null;

    if (attachmentFile) {
      const ext = attachmentFile.name.split('.').pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('inquiry-attachments')
        .upload(path, attachmentFile);

      if (uploadError) {
        alert('파일 업로드에 실패했습니다: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('inquiry-attachments')
        .getPublicUrl(path);

      attachment_url = urlData.publicUrl;
      attachment_name = attachmentFile.name;
    }

    const { error } = await supabase.from('inquiries').insert([{ ...formData, attachment_url, attachment_name }]);

    if (!error) {
      alert('문의가 성공적으로 접수되었습니다.');
      setFormData({ name: '', organization: '', phone: '', email: '', subject: '', message: '' });
      setAttachmentFile(null);
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
    setIsSubmitting(false);
  };

  const inputClass = "w-full border-b border-gray-300 py-3 px-0 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-800 outline-none transition-colors bg-transparent";
  const labelClass = "block text-[14px] font-bold text-gray-800 mb-2 tracking-wide";


  return (
    <div className="bg-white min-h-screen py-24 px-6">
      <div className="max-w-xl mx-auto">

        {/* 타이틀 */}
        <div className="text-center mb-14">
          <h1 className="text-[32px] font-bold text-gray-950 tracking-tighter mb-3">상담 문의</h1>
          <p className="text-[14px] text-gray-400 font-light">궁금하신 점을 남겨주시면 전문가가 직접 답변해드립니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* 이름 + 소속 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>이름</label>
              <input
                type="text"
                required
                className={inputClass}
                placeholder="이름을 입력해주세요."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>소속</label>
              <input
                type="text"
                className={inputClass}
                placeholder="소속을 입력해주세요."
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>
          </div>

          {/* 연락처 + 이메일 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>연락처</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div>
              <label className={labelClass}>이메일</label>
              <input
                type="text"
                className={`${inputClass} ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleEmailChange}
              />
              {errors.email && <p className="mt-1.5 text-[12px] text-red-400">{errors.email}</p>}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className={labelClass}>제목</label>
            <input
              type="text"
              required
              className={inputClass}
              placeholder="문의 제목을 입력해주세요."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* 문의 내용 */}
          <div>
            <label className={labelClass}>문의 내용</label>
            <textarea
              rows="7"
              required
              className="w-full border border-gray-300 p-4 text-[14px] text-gray-800 placeholder-gray-300 focus:border-gray-800 outline-none transition-colors bg-transparent resize-none"
              placeholder="문의 내용을 입력해주세요."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* 첨부파일 */}
          <div>
            <label className={labelClass}>첨부파일 <span className="text-gray-400 font-light text-[12px]">(선택)</span></label>
            <FileDropZone file={attachmentFile} onFileChange={setAttachmentFile} />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gray-950 text-white text-[15px] font-bold tracking-widest hover:bg-gray-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? '접수 중...' : '문의하기'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Inquiry;
