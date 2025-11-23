# EPG3 项目文档

欢迎来到 EPG3 项目文档中心！本目录包含项目的所有文档资料。

## 📚 文档导航

### 🚀 快速开始
- [快速开始指南](QUICK_START.md) - 项目安装、配置和运行
- [项目结构说明](PROJECT_STRUCTURE.md) - 目录结构和规范
- [优化指南](PROJECT_OPTIMIZATION_GUIDE.md) - 项目优化建议

### 📖 开发文档
- [API 接口文档](API.md) - 所有 API 接口说明
- [更新日志](CHANGELOG.md) - 版本更新记录

### 📝 开发指南
位于 `guides/` 目录下：
- [初始化流程实现说明](guides/初始化流程实现说明.md)
- [客户端首页实现说明](guides/客户端首页实现说明.md)
- [订单页面实现说明](guides/订单页面实现说明.md)
- [消息页面实现说明](guides/消息页面实现说明.md)
- [我的页面实现说明](guides/我的页面实现说明.md)
- [实名认证页面实现说明](guides/实名认证页面实现说明.md)
- [发布工单页面实现说明](guides/发布工单页面实现说明.md)
- [模拟登录功能说明](guides/模拟登录使用说明.md)
- [底部导航修复说明](guides/底部导航修复说明.md)
- [路由配置说明](guides/路由配置说明.md)

## 🗂️ 文档结构

```
docs/
├── README.md                     # 文档导航（本文档）
├── QUICK_START.md                # 快速开始
├── PROJECT_STRUCTURE.md          # 项目结构
├── PROJECT_OPTIMIZATION_GUIDE.md # 优化指南
├── API.md                        # API 文档
├── CHANGELOG.md                  # 更新日志
└── guides/                       # 开发指南
    ├── 初始化流程实现说明.md
    ├── 客户端首页实现说明.md
    ├── 订单页面实现说明.md
    └── ...
```

## 🎯 项目概述

EPG3 是一个基于 uni-app 开发的多端应用，包含客户端和工程师端两个角色。

### 主要功能
- 🔐 用户登录与认证
- 📱 客户端首页
- 👷 工程师端首页
- 📋 订单管理
- 💬 消息中心
- 👤 个人中心
- ✅ 实名认证
- 🛠️ 售前售后服务

### 技术栈
- **框架**：uni-app + Vue 3
- **语言**：JavaScript + UTS
- **样式**：SCSS
- **状态管理**：Vuex
- **构建工具**：HBuilderX

## 📦 核心模块

### 1. 状态管理 (`/store`)
- 用户模块：管理用户信息、登录状态
- 订单模块：管理订单列表、订单详情
- 应用模块：管理应用全局状态

### 2. API 接口 (`/api`)
- 用户接口：登录、注册、用户信息
- 订单接口：订单 CRUD 操作
- 消息接口：消息管理
- 服务接口：服务查询、售前售后
- 通用接口：文件上传、系统配置

### 3. 工具函数 (`/utils`)
- request.js：HTTP 请求封装
- auth.js：认证工具
- validator.js：表单验证
- navigation.js：路由导航
- common.js：通用工具

### 4. 公共组件 (`/components`)
- NavBar：顶部导航栏
- TabBar：底部导航栏
- MockUserSwitch：模拟用户切换

## 🔗 相关链接

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [HBuilderX 下载](https://www.dcloud.io/hbuilderx.html)

## 📞 技术支持

如有问题，请查看相关文档或联系开发团队。

---

**最后更新时间**：2024-XX-XX

