import { defineConfig } from 'vite';
import react from '@viteplugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 루트 도메인(1017.life) 사용 시 '/'로 설정
});
