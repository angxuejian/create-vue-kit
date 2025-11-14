---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "{{name}}"
  text: "{{description}}"
  tagline: ""
  image:
    src: '/images/logo.svg'
    alt: 'Logo'
    style:
      border-radius: 16px
      height: auto
      margin-left: 200px
      margin-top: 100px

  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/angxuejian/{{name}}

# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const layout = document.querySelector('.Layout')
  layout?.classList.add('is-home-layout')
})

onUnmounted(() => {
  const layout = document.querySelector('.Layout')
  layout?.classList.remove('is-home-layout')
})
</script>

<style>
/* ==== Vite 风格发光背景 + logo 发光效果 ==== */

/* 整个 hero 背景：放射渐变发光 */
.is-home-layout.Layout {
  background: radial-gradient(
    circle at center,
    rgba(100, 108, 255, 0.15) 0%,
    rgba(100, 108, 255, 0.05) 40%,
    transparent 70%
  );
  position: relative;
  overflow: hidden;
  height: 100%;

}

/* 背景添加轻微流动光晕动画 */
.is-home-layout.Layout::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    rgba(100, 108, 255, 0.25),
    rgba(189, 52, 254, 0.15),
    rgba(255, 255, 255, 0.1),
    rgba(100, 108, 255, 0.25)
  );
  animation: rotateGlow 12s linear infinite;
  z-index: 0;
  filter: blur(80px);
}

/* 背景旋转动画 */
@keyframes rotateGlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Hero 区域文字内容保持在上层 */
.is-home-layout .VPHomeHero > * {
  position: relative;
  z-index: 1;
}

/* Logo 发光 */
.is-home-layout .VPHomeHero .image img {
  filter: drop-shadow(0 0 25px rgba(100, 108, 255, 0.7))
          drop-shadow(0 0 60px rgba(189, 52, 254, 0.3));
  transition: transform 0.6s ease, filter 0.6s ease;
}

/* 鼠标悬停时轻微放大 + 更亮 */
/* .VPHomeHero .image img:hover {
  filter: drop-shadow(0 0 40px rgba(100, 108, 255, 0.9))
          drop-shadow(0 0 80px rgba(189, 52, 254, 0.5));
} */

 /* 鼠标悬停时轻微放大 + 更亮（Pinia黄色风格） */
.is-home-layout .VPHomeHero .image img:hover {
  filter: drop-shadow(0 0 35px rgba(255, 230, 109, 0.9))   /* 主亮黄光 */
          drop-shadow(0 0 60px rgba(255, 210, 80, 0.6))    /* 柔和橙黄扩散 */
          drop-shadow(0 0 90px rgba(255, 200, 40, 0.4));   /* 更远层渐变光 */
}


.is-home-layout .VPFooter {
  background-color: transparent !important;
  border-top-color: transparent !important;
}
</style>