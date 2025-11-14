# create-vue-kit
Scaffold a lightweight Vue 3 monorepo project powered by Vite, TypeScript, ESLint, Prettier, and VitePress documentation with GitHub Actions deployment.

## Use

```bash
npm create @angxuejian/vue-kit@latest
```
or

```bash
npx @angxuejian/create-vue-kit
```

## 项目结构

生成的项目使用 pnpm workspace 构建 monorepo 架构，目录结构如下：

```
template/
├── packages/                # 核心代码包（组件库/工具库）
│   ├── index.ts            # 主入口文件
│   ├── package.json        # 包配置文件
│   └── tsconfig.json       # TypeScript 配置
│
├── play/                   # 开发调试环境（基于 Vite + Vue3）
│   ├── public/             # 静态资源目录
│   │   └── favicon.ico     # 网站图标
│   ├── src/                # 源代码目录
│   │   ├── App.vue         # Vue 根组件
│   │   └── main.ts         # 应用入口文件
│   ├── index.html          # HTML 模板文件
│   ├── package.json        # 包配置文件
│   ├── tsconfig.json       # TypeScript 配置
│   └── vite.config.ts      # Vite 开发服务器配置
│
├── docs/                   # 文档站点（基于 VitePress）
│   ├── public/             # 静态资源目录
│   │   └── images/         # 图片资源目录
│   │       └── logo.svg    # Logo 图标
│   ├── getting-started.md  # 快速开始文档
│   ├── guide.md            # 使用指南文档
│   ├── index.md            # 首页文档
│   └── package.json        # 包配置文件
│
├── eslint.config.ts        # ESLint 代码规范配置
├── tsconfig.json           # 根 TypeScript 配置
├── pnpm-workspace.yaml     # pnpm 工作空间配置（定义 monorepo 子包）
├── package.json            # 根包配置文件
└── .gitignore              # Git 忽略文件配置
```

### 目录说明

- **packages/**: 存放核心代码，可以是组件库、工具库等，是整个项目的核心业务逻辑所在
- **play/**: 开发沙盒环境，用于在开发过程中实时预览和调试 packages 中的代码
- **docs/**: 使用 VitePress 构建的文档站点，用于编写项目文档和使用指南