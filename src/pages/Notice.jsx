import React from 'react';
import { Link } from 'react-router-dom';

const Notice = () => {
  const notices = [
    { id: 4, title: "2026년 정기 총회 개최 안내", date: "2026.03.15", views: 128, important: true },
    { id: 3, title: "신규 조합원 가입 절차 안내 (개정)", date: "2026.02.20", views: 450, important: true },
    { id: 2, title: "과학기술인 협동조합 기술 자문 사례집 발간", date: "2026.01.10", views: 320, important: false },
    { id: 1, title: "홈페이지 리뉴얼 오픈 안내", date: "2025.12.28", views: 890, important: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">공지사항</h1>
          <p className="text-gray-500">조합의 주요 소식과 알림을 전해드립니다.</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {/* 검색창 */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="제목으로 검색" 
              className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a4a9c]"
            />
            <button className="absolute right-3 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>

        {/* 게시판 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t-2 border-gray-900">
            <thead>
              <tr className="bg-gray-50 text-sm font-bold text-gray-700 border-b border-gray-200">
                <th className="px-6 py-4 w-20 text-center">번호</th>
                <th className="px-6 py-4">제목</th>
                <th className="px-6 py-4 w-32 text-center">날짜</th>
                <th className="px-6 py-4 w-24 text-center">조회수</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-5 text-center text-sm text-gray-500">
                    {notice.important ? <span className="text-[#1a4a9c] font-bold">공지</span> : notice.id}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-base ${notice.important ? 'font-bold text-gray-900' : 'text-gray-700'} group-hover:text-[#1a4a9c]`}>
                      {notice.title}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-sm text-gray-400">{notice.date}</td>
                  <td className="px-6 py-5 text-center text-sm text-gray-400">{notice.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Notice;