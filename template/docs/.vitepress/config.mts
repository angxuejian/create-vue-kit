import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/{{name}}/',  // ← 必须这样设置
  lang: 'zh-CN',
  title: '{{name}}',
  description: '{{description}}',

  head: [
    // ✅ 使用与 vite 官网一致的图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' }],
    // 可选：暗色模式下浏览器主题色
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

  themeConfig: {
    // ✅ 顶部导航栏
    nav: [
      {
        text: 'v1.x',
        link: '',
      }
    ],

    // ✅ 侧边栏配置
    sidebar: [
      {
        text: '简介',
        items: [
          { text: '指南', link: '/guide' },
          { text: '快速开始', link: '/getting-started' }
        ]
      }
    ],

    // ✅ logo（显示在左上角）
    logo: { src: '/images/logo.svg', alt: 'Pinia Logo' },

    // ✅ 社交链接（右上角图标）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/angxuejian/{{name}}' }
    ],

    // ✅ 页脚（可选）
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present angxuejian'
    },

    // ✅ 搜索（Vite 官网使用 algolia，但这里留空或可自配）
    search: {
      provider: 'local' // 你也可以改成 algolia
    },
  }
})
