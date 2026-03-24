import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; // 푸터 불러오기

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer /> {/* 푸터 적용 */}
    </div>
  );
};

export default Layout;