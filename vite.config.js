import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 反向代理，避免跨域问题
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       // secure:false,
  //       // rewrite: path => path.replace(/^\/users/, '')
  //     }
  //   }
  // }
  server: {
    port: 8080, // 默认启动的端口号
    // open: true, // 自动打开默认浏览器
    cors: true, // cors依赖，设置允许跨域
  },
  // resolve: {
  //   alias: {
  //     // "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
  //     '@': path.resolve(__dirname, './src')
  //   }
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: '@/assets',
      utils: '@/utils',
      api: '@/api'
    },
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  },
})
