# 工程师上门维修平台

这是一个基于 uni-app x 开发的工程师上门维修服务平台。

## 项目结构

```
epg3/
├── pages/
│   ├── index/                 # 登录页面
│   │   └── index.uvue
│   └── home/                  # 首页
│       └── home.uvue
├── utils/
│   └── auth.ts               # 认证工具函数
├── static/                   # 静态资源
├── pages.json               # 页面配置
├── manifest.json            # 应用配置
└── home-page.html          # HTML 原型页面（参考）
```

## 功能说明

### 1. 登录页面 (`pages/index/index.uvue`)

- ✅ 微信一键登录
- ✅ 手机号授权
- ✅ 开发模式模拟登录
- ✅ 登录状态检查

**开发模式：**
- 设置 `isDev = true` 启用模拟登录，无需真实后端
- 模拟用户信息会自动生成并保存
- 适合前端开发和测试

**生产模式：**
- 设置 `isDev = false` 连接真实后端
- 需要配置后端 API 地址（见下文）

### 2. 首页 (`pages/home/home.uvue`)

- ✅ 顶部导航栏（城市选择、AI客服、菜单、搜索）
- ✅ 会员权益横幅
- ✅ 主要服务区（找售后、找售前、找团队）
- ✅ 服务网格（12个服务项目）
- ✅ 底部操作栏
- ✅ 底部导航栏
- ✅ 登录状态检查（未登录自动跳转）

### 3. 认证工具 (`utils/auth.ts`)

提供统一的认证管理功能：

```typescript
// 检查登录状态
checkLogin(): boolean

// 获取 token
getToken(): string

// 获取用户信息
getUserInfo(): UserInfo | null

// 保存登录信息
saveLoginInfo(token: string, userInfo: UserInfo): void

// 退出登录
logout(): void

// 微信登录
wechatLogin(): Promise<LoginResponse>

// 获取手机号
getPhoneNumber(code: string): Promise<any>
```

## 快速开始

### 1. 开发测试（使用模拟登录）

1. 确保 `pages/index/index.uvue` 中 `isDev = true`
2. 运行项目到微信小程序开发者工具
3. 点击"微信一键登录"按钮
4. 自动使用模拟数据登录并跳转到首页

### 2. 连接真实后端

#### 步骤 1：配置后端地址

在以下文件中修改 `API_BASE_URL`：

**`pages/index/index.uvue`** (第56行)：
```typescript
const API_BASE_URL = 'https://your-api-domain.com'  // 改为您的后端地址
```

**`utils/auth.ts`** (第78行 和 第98行)：
```typescript
const API_BASE_URL = 'https://your-api-domain.com'  // 改为您的后端地址
```

#### 步骤 2：设置生产模式

在 `pages/index/index.uvue` 中设置：
```typescript
const isDev = false  // 启用真实后端
```

#### 步骤 3：后端接口要求

您的后端需要提供以下接口：

##### 1. 微信登录接口

```
POST /api/auth/wechat-login
Content-Type: application/json

Request Body:
{
  "code": "微信登录凭证",
  "platform": "weixin"
}

Response:
{
  "success": true,
  "message": "登录成功",
  "data": {
    "token": "用户token",
    "userInfo": {
      "id": "用户ID",
      "nickname": "用户昵称",
      "avatar": "头像URL",
      "phone": "手机号（可选）"
    }
  }
}
```

##### 2. 手机号解密接口

```
POST /api/auth/phone-number
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "code": "手机号授权码"
}

Response:
{
  "success": true,
  "message": "获取成功",
  "data": {
    "phoneNumber": "138****8888"
  }
}
```

## 页面流程

```
启动应用
    ↓
检查登录状态
    ↓
┌─────────────┐
│   未登录    │ → 显示登录页面 → 点击登录 → 保存信息 → 跳转首页
└─────────────┘
    ↓
┌─────────────┐
│   已登录    │ → 直接跳转首页
└─────────────┘
    ↓
首页加载
    ↓
再次检查登录
    ↓
显示首页内容
```

## 本地存储

应用使用 `uni.storage` 保存以下数据：

- `token`: 用户登录令牌
- `userInfo`: 用户基本信息
  ```typescript
  {
    id: string          // 用户ID
    nickname: string    // 昵称
    avatar: string      // 头像URL
    phone?: string      // 手机号（可选）
  }
  ```

## 退出登录

在首页点击右上角菜单 → 选择"退出登录"：
1. 清除本地存储的 token 和 userInfo
2. 自动跳转回登录页面

## 注意事项

1. **开发模式**适合前端开发，登录会使用模拟数据
2. **生产模式**需要配置真实的后端接口地址
3. 首页会自动检查登录状态，未登录会跳转到登录页
4. token 和用户信息保存在本地存储中，关闭应用不会丢失
5. HTML 原型页面 (`home-page.html`) 仅供参考，实际使用 `.uvue` 文件

## 开发说明

### 添加新页面

1. 在 `pages/` 目录下创建新页面文件夹
2. 在 `pages.json` 中注册新页面
3. 使用 `uni.navigateTo()` 或 `uni.switchTab()` 跳转

### 需要登录的页面

在页面的 `onMounted` 中添加登录检查：

```typescript
import { requireLogin } from '@/utils/auth'

onMounted(() => {
  requireLogin()  // 未登录会自动跳转
})
```

## 技术栈

- uni-app x
- Vue 3 Composition API
- TypeScript
- SCSS

## License

MIT
