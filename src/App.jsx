import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import About from './pages/About';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import Notice from './pages/Notice';
import Inquiry from './pages/Inquiry';
import NoticeDetail from './pages/NoticeDetail';
import BusinessDetail from './pages/BusinessDetail';
import Admin from './pages/Admin';
import InquiryAdmin from './pages/InquiryAdmin';
import MyPage from './pages/MyPage';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="members" element={<Members />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="login" element={<Login />} />
            <Route path="notice" element={<ProtectedRoute><Notice /></ProtectedRoute>} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="notice/:id" element={<ProtectedRoute><NoticeDetail /></ProtectedRoute>} />
            <Route path="signup" element={<Signup />} />
            <Route path="business" element={<BusinessDetail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
            <Route path="admin/inquiries" element={<ProtectedRoute adminOnly><InquiryAdmin /></ProtectedRoute>} />
            <Route path="mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;