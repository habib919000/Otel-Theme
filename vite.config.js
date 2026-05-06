import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rooms: resolve(__dirname, 'rooms.html'),
        property: resolve(__dirname, 'property.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        roomDetail: resolve(__dirname, 'room-detail.html'),
        blogSingle: resolve(__dirname, 'blog-single.html'),
      },
    },
  },
});
