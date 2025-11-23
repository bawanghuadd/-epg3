# 模拟登录功能 - 快速上手指南

## 🎯 功能概述

模拟登录功能为开发环境提供了快速测试不同用户角色的能力，无需真实微信登录，极大提升开发效率。

## ✨ 主要特性

- ✅ 一键快速登录（客户/工程师）
- ✅ 4 个预设测试账号
- ✅ 支持快速切换用户
- ✅ 完整的用户数据模拟
- ✅ 可视化用户切换组件
- ✅ 专用测试页面

## 🚀 快速开始

### 方式一：登录页面直接登录

1. 启动项目，进入登录页面
2. 在页面底部看到"开发环境"区域
3. 点击"模拟客户登录"或"模拟工程师登录"
4. 自动登录并跳转到对应首页

### 方式二：使用悬浮切换按钮

1. 在已登录状态下，右下角会显示 👤 悬浮按钮
2. 点击按钮打开用户切换面板
3. 选择要切换的测试账号
4. 自动切换并刷新页面

### 方式三：访问测试页面

在浏览器中访问测试页面（开发环境）：
```
/pages/test/mock-login-demo
```

此页面提供：
- 当前登录状态显示
- 所有测试账号快速登录
- 工具函数测试
- 测试场景快捷入口
- 操作日志实时显示

## 📦 测试账号

### 客户账号

#### 1️⃣ 测试客户
- **账号标识**: `customer`
- **手机号**: 13800138000
- **状态**: 未认证 ❌
- **用途**: 测试实名认证流程

#### 2️⃣ 王小明
- **账号标识**: `customer2`
- **手机号**: 13700137000
- **状态**: 已认证 ✅
- **会员等级**: VIP 1
- **用途**: 测试完整客户功能

### 工程师账号

#### 1️⃣ 测试工程师
- **账号标识**: `engineer`
- **手机号**: 13900139000
- **状态**: 已认证 ✅
- **技能**: 智慧园区、充电桩维修、AGV机器人
- **评分**: 4.8⭐
- **完成订单**: 156
- **用途**: 测试基础工程师功能

#### 2️⃣ 资深维修师
- **账号标识**: `engineer2`
- **手机号**: 13600136000
- **状态**: 已认证 ✅
- **会员等级**: VIP 3
- **技能**: 智慧交管、智慧警务、应急消防、出入口通道
- **评分**: 4.9⭐
- **完成订单**: 328
- **用途**: 测试高级工程师功能

## 💻 代码使用

### 基础登录

```javascript
import { mockLogin } from '@/utils/mock-login'

// 登录为客户
await mockLogin('customer')

// 登录为工程师
await mockLogin('engineer')
```

### 带配置登录

```javascript
await mockLogin('customer', {
  showLoading: true,    // 显示加载提示
  showToast: true,      // 显示成功提示
  autoNavigate: true,   // 自动跳转首页
  delay: 800           // 延迟时间（ms）
})
```

### 快速切换用户

```javascript
import { switchMockUser } from '@/utils/mock-login'

// 快速切换（无加载提示，延迟更短）
await switchMockUser('engineer')
```

### 获取用户列表

```javascript
import { getMockUserList } from '@/utils/mock-login'

const users = getMockUserList()
console.log(users) // 返回所有测试账号
```

### 检查是否模拟登录

```javascript
import { isMockLogin } from '@/utils/mock-login'

if (isMockLogin()) {
  console.log('当前为模拟登录状态')
}
```

## 🎨 使用用户切换组件

在任意页面引入组件：

```vue
<template>
  <view class="page">
    <!-- 页面内容 -->
    
    <!-- 用户切换组件（右下角悬浮按钮） -->
    <MockUserSwitch />
  </view>
</template>

<script setup>
import MockUserSwitch from '@/components/MockUserSwitch/MockUserSwitch.uvue'
</script>
```

组件特性：
- 仅在模拟登录状态下显示
- 右下角悬浮按钮，不影响页面布局
- 弹出式用户列表面板
- 显示当前登录用户高亮
- 点击即可切换

## 🧪 测试场景示例

### 场景 1: 测试客户注册流程

```javascript
// 1. 未认证客户登录
await mockLogin('customer')

// 2. 访问需要认证的页面
// 3. 引导用户进行实名认证
// 4. 测试认证流程
```

### 场景 2: 测试订单完整流程

```javascript
// 1. 客户创建订单
await mockLogin('customer2')
// ... 创建订单

// 2. 切换为工程师接单
await switchMockUser('engineer')
// ... 接单操作

// 3. 切换回客户确认完成
await switchMockUser('customer2')
// ... 确认订单
```

### 场景 3: 测试权限控制

```javascript
import { isCustomer, isEngineer } from '@/utils/auth'

// 客户角色
await mockLogin('customer')
console.log(isCustomer()) // true
console.log(isEngineer()) // false

// 工程师角色
await mockLogin('engineer')
console.log(isCustomer()) // false
console.log(isEngineer()) // true
```

## 📁 相关文件

```
epg3/
├── pages/
│   ├── index/
│   │   └── index.uvue           # 登录页面（含模拟登录按钮）
│   └── test/
│       └── mock-login-demo.uvue  # 测试演示页面
├── components/
│   └── MockUserSwitch/
│       └── MockUserSwitch.uvue   # 用户切换组件
├── utils/
│   └── mock-login.js             # 模拟登录工具函数
└── remind/
    └── 模拟登录使用说明.md        # 详细使用文档
```

## ⚙️ 配置选项

### 显示/隐藏模拟登录

**登录页面：**
```javascript
// pages/index/index.uvue
const showMockLogin = ref(true)  // 改为 false 隐藏
```

**用户切换组件：**
```javascript
// components/MockUserSwitch/MockUserSwitch.uvue
const isDev = ref(true)  // 改为 false 禁用
```

### 根据环境自动判断

```javascript
const showMockLogin = ref(process.env.NODE_ENV === 'development')
```

## 🔧 自定义测试账号

在 `utils/mock-login.js` 中添加新账号：

```javascript
export const MOCK_USERS = {
  // ... 现有账号
  
  // 添加新账号
  custom_user: {
    id: 'mock_custom_001',
    nickname: '自定义用户',
    phone: '13000000000',
    user_type: 'customer',
    is_verified: true,
    vip_level: 2,
    // ... 其他字段
  }
}
```

使用新账号：
```javascript
await mockLogin('custom_user')
```

## 📊 Token 格式

模拟登录生成的 token 格式：
```
mock_token_{userType}_{timestamp}_{random}
```

示例：
```
mock_token_customer_1700000000000_x9k2m3p7q
```

后端可以通过 `token.startsWith('mock_token_')` 识别模拟登录并跳过验证。

## ⚠️ 注意事项

1. **仅开发环境使用** - 生产环境务必关闭模拟登录功能
2. **数据隔离** - 模拟登录的数据应与真实数据隔离
3. **Token 验证** - 后端需识别模拟 token 并做相应处理
4. **及时清理** - 发布前检查并清理/禁用相关代码

## 🐛 常见问题

### Q1: 点击模拟登录没反应？
**A:** 检查 `showMockLogin` 是否为 true，查看控制台是否有报错。

### Q2: 切换用户后数据没更新？
**A:** 确认页面正确读取了用户信息，必要时刷新页面。

### Q3: 悬浮按钮不显示？
**A:** 只有模拟登录状态下才显示，检查 `isMockLogin()` 返回值。

### Q4: 如何添加更多测试账号？
**A:** 在 `utils/mock-login.js` 的 `MOCK_USERS` 对象中添加。

## 📚 更多文档

详细文档请查看：`remind/模拟登录使用说明.md`

## 🎉 开始使用

1. ✅ 启动项目
2. ✅ 访问登录页面
3. ✅ 点击"模拟客户登录"或"模拟工程师登录"
4. ✅ 开始开发测试！

祝开发愉快！🚀

