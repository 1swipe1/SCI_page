import React from 'react';

const Inquiry = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#1a4a9c] py-16 px-6 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">문의하기</h1>
        <p className="opacity-80">궁금하신 사항을 남겨주시면 전문가가 직접 답변해 드립니다.</p>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">성함 / 단체명</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4a9c] transition-all" placeholder="성함을 입력하세요" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이메일 주소</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4a9c] transition-all" placeholder="example@mail.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">문의 분야</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4a9c] transition-all">
                <option>선택해 주세요</option>
                <option>AI 기술 자문</option>
                <option>구조 안전 진단</option>
                <option>조합 가입 문의</option>
                <option>기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
              <textarea rows="6" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4a9c] transition-all" placeholder="자세한 문의 내용을 입력해 주세요"></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#1a4a9c] text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all transform hover:-translate-y-1">
              문의 접수하기
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;