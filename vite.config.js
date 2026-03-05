import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ⚠️ 중요: 반드시 앞뒤에 슬래시(/)를 넣고 '저장소 이름'만 적으세요.
  // 주소 전체(https://...)를 적으면 절대 안 됩니다!
  base: '/SCI_page/',
})