# 项目优化规范说明

## 优化概述

本次优化主要从以下几个方面进行：

1. **文件夹结构优化** - 统一目录结构，便于维护
2. **代码逻辑优化** - 提取公共逻辑，减少重复代码
3. **静态资源优化** - 规范资源管理
4. **样式规范优化** - 统一样式变量和混入

## 一、文件夹结构优化

### 新增目录结构

```
epg3/
├── config/              # 配置文件（新增）
│   └── index.js        # 统一配置管理
├── components/          # 公共组件（新增）
│   ├── TabBar/         # 底部导航栏组件
│   └── NavBar/         # 顶部导航栏组件
├── styles/             # 样式文件（新增）
│   ├── variables.scss  # 样式变量
│   └── mixins.scss     # 样式混入
└── utils/              # 工具函数（优化）
    ├── api.js         # API接口封装
    ├── request.js     # HTTP请求封装
    ├── auth.js        # 认证工具（新增）
    ├── validator.js   # 验证工具（新增）
    ├── navigation.js  # 导航工具（新增）
    └── common.js      # 通用工具（新增）
```

## 二、代码逻辑优化

### 1. 配置统一管理 (`config/index.js`)

**优化前：**
- 配置分散在各个文件中
- 硬编码的字符串和数字
- 难以统一修改

**优化后：**
```javascript
// 统一配置管理
import { API_CONFIG, STORAGE_KEYS, ROUTES, ORDER_STATUS } from '@/config'
```

**优势：**
- 集中管理所有配置
- 易于维护和修改
- 避免硬编码

### 2. 认证工具函数 (`utils/auth.js`)

**优化前：**
```javascript
// 每个页面都重复写
const token = uni.getStorageSync('token')
if (!token) {
  uni.reLaunch({ url: '/pages/index/index' })
}
```

**优化后：**
```javascript
import { requireAuth, isLoggedIn, getUserInfo } from '@/utils/auth'

// 简洁的调用
if (!requireAuth()) {
  return
}
```

**优势：**
- 代码复用
- 统一逻辑
- 易于维护

### 3. 导航工具函数 (`utils/navigation.js`)

**优化前：**
```javascript
// 每个页面都写路由跳转
uni.reLaunch({ url: '/pages/home/home' })
uni.navigateTo({ url: '/pages/order/create' })
```

**优化后：**
```javascript
import { navigateToHome, navigateToCreateOrder } from '@/utils/navigation'

navigateToHome()
navigateToCreateOrder({ service_type: 1 })
```

**优势：**
- 统一路由管理
- 支持参数传递
- 易于修改路由

### 4. 表单验证工具 (`utils/validator.js`)

**优化前：**
```javascript
// 每个表单都重复写验证逻辑
if (!/^1[3-9]\d{9}$/.test(phone)) {
  uni.showToast({ title: '手机号格式错误' })
}
```

**优化后：**
```javascript
import { validatePhone, showValidationError } from '@/utils/validator'

const result = validatePhone(phone)
if (!result.valid) {
  showValidationError(result.message)
}
```

**优势：**
- 统一验证规则
- 统一错误提示
- 易于扩展

### 5. API 接口优化 (`utils/api.js`)

**优化前：**
- 直接使用 `uni.request`
- 错误处理分散
- Token 手动添加

**优化后：**
```javascript
import { wechatLogin, createOrder } from '@/utils/api'

// 自动处理 token、错误、loading
const result = await wechatLogin({ code })
```

**优势：**
- 统一错误处理
- 自动添加 token
- 支持 loading 配置

## 三、公共组件优化

### 1. 底部导航栏组件 (`components/TabBar/TabBar.uvue`)

**使用方式：**
```vue
<template>
  <TabBar :current-page="currentPage" :order-badge="orderCount" />
</template>
```

**优势：**
- 统一底部导航样式
- 支持角标显示
- 易于维护

### 2. 顶部导航栏组件 (`components/NavBar/NavBar.uvue`)

**使用方式：**
```vue
<template>
  <NavBar title="页面标题" :show-back="true">
    <template #right>
      <text @click="handleAction">操作</text>
    </template>
  </NavBar>
</template>
```

**优势：**
- 统一顶部导航样式
- 支持插槽自定义
- 自动处理安全区域

## 四、样式规范优化

### 1. 样式变量 (`styles/variables.scss`)

**使用方式：**
```scss
@import '@/styles/variables.scss';

.title {
  color: $text-primary;
  font-size: $font-lg;
  border-radius: $radius-medium;
}
```

**优势：**
- 统一颜色、字体、间距
- 易于主题切换
- 保持视觉一致性

### 2. 样式混入 (`styles/mixins.scss`)

**使用方式：**
```scss
@import '@/styles/mixins.scss';

.card {
  @include card;
}

.button {
  @include button-primary;
}
```

**优势：**
- 减少重复代码
- 统一组件样式
- 易于修改

## 五、页面优化示例

### 登录页面优化

**优化前：**
- 硬编码 API 地址
- 重复的存储逻辑
- 分散的用户类型判断

**优化后：**
```javascript
import { isLoggedIn, setToken, setUserInfo, navigateToHome } from '@/utils/auth'
import { wechatLogin } from '@/utils/api'

// 简洁清晰的逻辑
if (isLoggedIn()) {
  navigateToHome()
  return
}

const result = await wechatLogin({ code })
saveLoginInfoAndNavigate(result.data.token, result.data)
```

## 六、使用指南

### 1. 新页面开发规范

```vue
<template>
  <view class="page">
    <NavBar title="页面标题" :show-back="true" />
    <!-- 页面内容 -->
    <TabBar :current-page="'home'" />
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { requireAuth } from '@/utils/auth'
import NavBar from '@/components/NavBar/NavBar.uvue'
import TabBar from '@/components/TabBar/TabBar.uvue'

onMounted(() => {
  // 检查登录
  if (!requireAuth()) {
    return
  }
  
  // 加载数据
  loadData()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.page {
  background-color: $bg-secondary;
}
</style>
```

### 2. API 调用规范

```javascript
import { createOrder } from '@/utils/api'

async function handleSubmit() {
  try {
    const result = await createOrder(formData.value)
    if (result.code === 0) {
      uni.showToast({ title: '创建成功' })
      navigateToOrderList()
    }
  } catch (error) {
    console.error('创建订单失败:', error)
  }
}
```

### 3. 表单验证规范

```javascript
import { validatePhone, validateRequired, showValidationError } from '@/utils/validator'

function validateForm() {
  const phoneResult = validatePhone(formData.phone)
  if (!phoneResult.valid) {
    showValidationError(phoneResult.message)
    return false
  }
  
  const nameResult = validateRequired(formData.name, '姓名')
  if (!nameResult.valid) {
    showValidationError(nameResult.message)
    return false
  }
  
  return true
}
```

## 七、迁移指南

### 现有页面迁移步骤

1. **引入工具函数**
   ```javascript
   import { requireAuth, getUserInfo } from '@/utils/auth'
   import { navigateToHome } from '@/utils/navigation'
   ```

2. **替换硬编码**
   ```javascript
   // 替换前
   uni.getStorageSync('token')
   
   // 替换后
   import { getToken } from '@/utils/auth'
   getToken()
   ```

3. **使用公共组件**
   ```vue
   <!-- 替换底部导航 -->
   <TabBar :current-page="currentPage" />
   ```

4. **使用样式变量**
   ```scss
   // 替换硬编码颜色
   color: $text-primary;
   ```

## 八、注意事项

1. **不要直接使用 `uni.getStorageSync`**，使用 `utils/auth.js` 中的函数
2. **不要硬编码路由路径**，使用 `config/index.js` 中的 `ROUTES`
3. **不要重复写验证逻辑**，使用 `utils/validator.js` 中的函数
4. **统一使用公共组件**，保持 UI 一致性
5. **使用样式变量和混入**，保持样式统一

## 九、后续优化建议

1. **状态管理** - 考虑引入 Pinia 进行全局状态管理
2. **类型定义** - 添加 TypeScript 类型定义文件
3. **单元测试** - 为工具函数添加单元测试
4. **代码分割** - 按需加载，优化性能
5. **错误监控** - 集成错误监控系统

