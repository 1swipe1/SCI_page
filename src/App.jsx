import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

// 👇 이 부분들이 빠져있을 거예요! 경로가 맞는지 꼭 확인하세요.
import Main from './pages/Main';
import Login from './pages/Login'; 
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />   {/* 여기서 Login을 쓰려면 위에서 import해야 합니다 */}
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;