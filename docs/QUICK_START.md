# 🚀 快速开始指南

本指南帮助您快速了解和使用优化后的项目结构。

## 📦 优化内容一览

### 新增文件
```
epg3/
├── components/                    # 公共组件（新增）
│   ├── TabBar/TabBar.uvue        # 底部导航栏组件
│   └── NavBar/NavBar.uvue        # 顶部导航栏组件
├── utils/
│   ├── errorHandler.js           # 全局错误处理（新增）
│   └── auth-improved.js          # 优化的认证工具（新增）
├── pages/
│   └── home/
│       └── home-optimized.uvue   # 优化后的首页示例（新增）
└── PROJECT_OPTIMIZATION_GUIDE.md # 详细优化文档（新增）
```

### 优化文件
```
├── styles/
│   ├── variables.scss            # 完善 120+ 变量
│   └── mixins.scss              # 新增 30+ 混入
```

---

## 🎯 5分钟快速上手

### 1. 使用 TabBar 组件

**替换旧代码**:
```vue
<!-- 旧代码：删除这些 -->
<view class="bottom-nav">
  <view class="nav-item">...</view>
  <!-- 100+ 行重复代码 -->
</view>

<style>
.bottom-nav { /* 100+ 行样式 */ }
</style>
```

**使用新组件**:
```vue
<template>
  <view class="page">
    <!-- 页面内容 -->
    
    <!-- 只需一行！ -->
    <TabBar current-page="home" :order-badge="3" :message-badge="5" />
  </view>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar/TabBar.uvue'
</script>
```

**参数说明**:
- `current-page`: 当前页面标识 ('home' | 'order' | 'message' | 'profile')
- `order-badge`: 订单角标数量（可选）
- `message-badge`: 消息角标数量（可选）

### 2. 使用样式系统

**引入样式变量和混入**:
```scss
<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.card {
  @include card;              // 使用卡片样式
  color: $text-primary;       // 使用文字颜色变量
  font-size: $font-md;        // 使用字体大小变量
}

.button {
  @include button-primary;    // 使用主按钮样式
}
</style>
```

**常用变量**:
```scss
// 颜色
$color-primary          // 主题色 #E53935
$text-primary          // 主要文字 #333
$text-secondary        // 次要文字 #666
$bg-primary            // 主背景 #FFF
$bg-secondary          // 次背景 #F5F5F5

// 尺寸
$spacing-sm            // 小间距 16rpx
$spacing-md            // 中间距 24rpx
$spacing-lg            // 大间距 32rpx
$font-sm               // 小字体 24rpx
$font-md               // 中字体 28rpx
$font-lg               // 大字体 32rpx
$radius-md             // 圆角 12rpx
$shadow-sm             // 阴影
```

**常用混入**:
```scss
@include card                  // 卡片样式
@include button-primary        // 主按钮
@include button-secondary      // 次按钮
@include flex-center           // Flex居中
@include flex-between          // 两端对齐
@include ellipsis              // 单行省略
@include ellipsis-multi(2)     // 多行省略
```

### 3. 使用错误处理

**在 App.uvue 中初始化**（只需一次）:
```javascript
// App.uvue
<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  // 初始化全局错误处理
  // 注意：需要将 errorHandler.js 改为 .uts 或在合适的地方调用
  console.log('应用启动')
})
</script>
```

**在页面中使用**:
```javascript
import { safeExecuteAsync } from '@/utils/errorHandler'
import { getOrderList } from '@/utils/api'

// 安全执行，自动处理错误
async function loadData() {
  const data = await safeExecuteAsync(
    async () => await getOrderList(),
    [] // 失败时的默认值
  )
  
  list.value = data
}
```

### 4. 使用优化的工具函数

```javascript
import { 
  requireAuth,      // 检查登录
  getUserInfo,      // 获取用户信息
  isVip,           // 检查VIP
  logout           // 退出登录
} from '@/utils/auth-improved'

onMounted(() => {
  // 检查登录（未登录自动跳转）
  if (!requireAuth()) return
  
  // 获取用户信息
  const user = getUserInfo()
  console.log(user.nickname)
  
  // 检查VIP
  if (isVip()) {
    showVipFeatures()
  }
})

// 退出登录
async function handleLogout() {
  const confirmed = await logout()
  if (confirmed) {
    console.log('已退出')
  }
}
```

---

## 📝 完整页面模板

### 列表页面模板

```vue
<template>
  <view class="page">
    <NavBar title="订单列表" :show-back="true" />
    
    <scroll-view scroll-y class="content">
      <!-- 空状态 -->
      <view v-if="list.length === 0" class="empty-state">
        <text class="empty-icon">📋</text>
        <text class="empty-text">暂无数据</text>
      </view>
      
      <!-- 列表 -->
      <view v-else class="list">
        <view 
          v-for="item in list" 
          :key="item.id" 
          class="list-item"
          @click="goToDetail(item)"
        >
          <text class="title">{{ item.title }}</text>
          <text class="desc">{{ item.desc }}</text>
        </view>
      </view>
      
      <!-- 占位 -->
      <view style="height: 180rpx;"></view>
    </scroll-view>
    
    <TabBar current-page="order" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar/NavBar.uvue'
import TabBar from '@/components/TabBar/TabBar.uvue'
import { requireAuth } from '@/utils/auth-improved'
import { safeExecuteAsync } from '@/utils/errorHandler'
import { getOrderList } from '@/utils/api'

const list = ref([])

onMounted(async () => {
  if (!requireAuth()) return
  await loadData()
})

async function loadData() {
  const data = await safeExecuteAsync(
    async () => await getOrderList(),
    []
  )
  list.value = data
}

function goToDetail(item: any) {
  uni.navigateTo({
    url: `/pages/order/detail?id=${item.id}`
  })
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
  min-height: 100vh;
  background-color: $bg-secondary;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: $spacing-lg;
}

.empty-state {
  @include empty-state;
}

.list-item {
  @include card;
  margin-bottom: $spacing-md;
  
  .title {
    @include ellipsis;
    font-size: $font-lg;
    color: $text-primary;
    margin-bottom: $spacing-sm;
    display: block;
  }
  
  .desc {
    @include ellipsis-multi(2);
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.5;
  }
}
</style>
```

### 表单页面模板

```vue
<template>
  <view class="page">
    <NavBar title="创建订单" :show-back="true" />
    
    <scroll-view scroll-y class="content">
      <view class="form">
        <view class="form-item">
          <text class="label">标题</text>
          <input 
            v-model="formData.title" 
            class="input"
            placeholder="请输入标题"
          />
        </view>
        
        <view class="form-item">
          <text class="label">描述</text>
          <textarea 
            v-model="formData.description" 
            class="textarea"
            placeholder="请输入描述"
          />
        </view>
        
        <button class="submit-btn" @click="handleSubmit">
          提交
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar.uvue'
import { validateRequired, showValidationError } from '@/utils/validator'
import { createOrder } from '@/utils/api'
import { safeExecuteAsync } from '@/utils/errorHandler'

const formData = ref({
  title: '',
  description: ''
})

async function handleSubmit() {
  // 验证
  const titleResult = validateRequired(formData.value.title, '标题')
  if (!titleResult.valid) {
    showValidationError(titleResult.message)
    return
  }
  
  // 提交
  const result = await safeExecuteAsync(async () => {
    return await createOrder(formData.value)
  })
  
  if (result) {
    uni.showToast({ title: '创建成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.page {
  min-height: 100vh;
  background-color: $bg-secondary;
}

.content {
  padding: $spacing-lg;
}

.form {
  @include card;
}

.form-item {
  margin-bottom: $spacing-lg;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    font-size: $font-md;
    color: $text-primary;
    margin-bottom: $spacing-sm;
    display: block;
  }
  
  .input,
  .textarea {
    width: 100%;
    padding: $spacing-md;
    border: 1rpx solid $border-color;
    border-radius: $radius-md;
    font-size: $font-md;
    background-color: $bg-primary;
  }
  
  .textarea {
    min-height: 200rpx;
  }
}

.submit-btn {
  @include button-primary;
  width: 100%;
  margin-top: $spacing-xl;
}
</style>
```

---

## 🎨 样式速查表

### 颜色变量
| 变量名 | 值 | 用途 |
|--------|-----|------|
| `$color-primary` | #E53935 | 主题色 |
| `$text-primary` | #333333 | 主要文字 |
| `$text-secondary` | #666666 | 次要文字 |
| `$text-tertiary` | #999999 | 三级文字 |
| `$bg-primary` | #FFFFFF | 主背景 |
| `$bg-secondary` | #F5F5F5 | 次背景 |
| `$border-color` | #E0E0E0 | 边框色 |

### 尺寸变量
| 变量名 | 值 | 用途 |
|--------|-----|------|
| `$spacing-sm` | 16rpx | 小间距 |
| `$spacing-md` | 24rpx | 中间距 |
| `$spacing-lg` | 32rpx | 大间距 |
| `$font-sm` | 24rpx | 小字体 |
| `$font-md` | 28rpx | 中字体 |
| `$font-lg` | 32rpx | 大字体 |
| `$radius-md` | 12rpx | 圆角 |
| `$radius-lg` | 16rpx | 大圆角 |

### 混入速查
| 混入名 | 用途 |
|--------|------|
| `@include card` | 卡片样式 |
| `@include button-primary` | 主按钮 |
| `@include button-secondary` | 次按钮 |
| `@include flex-center` | Flex居中 |
| `@include flex-between` | 两端对齐 |
| `@include ellipsis` | 单行省略 |
| `@include ellipsis-multi(2)` | 两行省略 |
| `@include empty-state` | 空状态 |

---

## 🔧 常用代码片段

### 检查登录
```javascript
import { requireAuth } from '@/utils/auth-improved'

onMounted(() => {
  if (!requireAuth()) return
  loadData()
})
```

### 表单验证
```javascript
import { validatePhone, showValidationError } from '@/utils/validator'

const result = validatePhone(phone.value)
if (!result.valid) {
  showValidationError(result.message)
  return
}
```

### API调用
```javascript
import { safeExecuteAsync } from '@/utils/errorHandler'
import { getOrderList } from '@/utils/api'

const data = await safeExecuteAsync(
  async () => await getOrderList(),
  []
)
```

### 跳转页面
```javascript
import { navigateToCreateOrder } from '@/utils/navigation'

navigateToCreateOrder({ service_type: 1 })
```

---

## 📚 更多资源

- 📖 [详细优化文档](./PROJECT_OPTIMIZATION_GUIDE.md)
- 📝 [原有优化说明](./OPTIMIZATION.md)
- 🎯 [示例页面](./pages/home/home-optimized.uvue)

---

## ✅ 检查清单

使用本优化方案时，确保：

- [ ] 已创建 `components/TabBar/TabBar.uvue`
- [ ] 已创建 `components/NavBar/NavBar.uvue`
- [ ] 已完善 `styles/variables.scss`
- [ ] 已完善 `styles/mixins.scss`
- [ ] 已创建 `utils/errorHandler.js`
- [ ] 已创建 `utils/auth-improved.js`
- [ ] 在页面中使用了 `<TabBar>` 组件
- [ ] 在样式中使用了变量和混入
- [ ] 已初始化错误处理
- [ ] 已测试页面功能

---

**开始使用优化后的项目吧！** 🎉

