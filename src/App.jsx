import React from 'react';
import { HashRouter,BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import About from './pages/About';
// 👇 이 부분들이 빠져있을 거예요! 경로가 맞는지 꼭 확인하세요.
import Main from './pages/Main';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import Notice from './pages/Notice';
import Inquiry from './pages/Inquiry';

function App() {
  return (
<HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} /> 
          <Route path="members" element={<Members />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="login" element={<Login />} />
          <Route path="notice" element={<Notice />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;