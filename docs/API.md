# API 接口文档

本文档详细说明项目中所有 API 接口的使用方法。

## 📚 接口分类

### 1. 用户相关接口 (`/api/user.js`)
- [登录接口](#登录接口)
- [用户信息](#用户信息)
- [实名认证](#实名认证)

### 2. 订单相关接口 (`/api/order.js`)
- [订单管理](#订单管理)
- [订单操作](#订单操作)

### 3. 消息相关接口 (`/api/message.js`)
- [消息管理](#消息管理)
- [消息设置](#消息设置)

### 4. 服务相关接口 (`/api/service.js`)
- [服务查询](#服务查询)
- [售前售后](#售前售后)

### 5. 通用接口 (`/api/common.js`)
- [文件上传](#文件上传)
- [系统配置](#系统配置)

---

## 登录接口

### 微信登录
```javascript
import { wechatLogin } from '@/api/user'

const result = await wechatLogin({
  code: 'wx_code'
})
```

### 手机号登录
```javascript
import { phoneLogin } from '@/api/user'

const result = await phoneLogin({
  phone: '13800138000',
  code: '123456'
})
```

### 账号密码登录
```javascript
import { login } from '@/api/user'

const result = await login({
  username: 'admin',
  password: '123456'
})
```

---

## 用户信息

### 获取用户信息
```javascript
import { getUserInfo } from '@/api/user'

const userInfo = await getUserInfo()
```

### 更新用户信息
```javascript
import { updateUserInfo } from '@/api/user'

const result = await updateUserInfo({
  nickname: '新昵称',
  avatar: 'https://...'
})
```

---

## 订单管理

### 创建订单
```javascript
import { createOrder } from '@/api/order'

const result = await createOrder({
  serviceId: '123',
  address: '服务地址',
  contact: '联系方式',
  remark: '备注'
})
```

### 获取订单列表
```javascript
import { getOrderList } from '@/api/order'

const result = await getOrderList({
  page: 1,
  pageSize: 10,
  status: 'all' // all, pending, processing, completed, cancelled
})
```

### 获取订单详情
```javascript
import { getOrderDetail } from '@/api/order'

const order = await getOrderDetail('orderId')
```

---

## 消息管理

### 获取消息列表
```javascript
import { getMessageList } from '@/api/message'

const result = await getMessageList({
  page: 1,
  pageSize: 20,
  type: 'all' // all, system, order, notice
})
```

### 标记消息已读
```javascript
import { markMessageRead } from '@/api/message'

await markMessageRead('messageId')
```

---

## 文件上传

### 上传单个文件
```javascript
import { uploadFile } from '@/api/common'

// 选择文件
uni.chooseImage({
  count: 1,
  success: async (res) => {
    const result = await uploadFile(res.tempFilePaths[0])
    console.log('文件地址:', result.url)
  }
})
```

### 批量上传文件
```javascript
import { uploadFiles } from '@/api/common'

// 选择多个文件
uni.chooseImage({
  count: 9,
  success: async (res) => {
    const results = await uploadFiles(res.tempFilePaths)
    console.log('文件列表:', results)
  }
})
```

---

## 🔧 请求配置

### 全局配置
在 `utils/request.js` 中配置：

```javascript
const config = {
  baseURL: 'https://api.example.com',
  timeout: 30000,
  header: {
    'Content-Type': 'application/json'
  }
}
```

### 单个接口配置
```javascript
export function createOrder(data) {
  return post('/orders/create', data, {
    showLoading: true,        // 显示加载
    loadingText: '提交中...', // 加载文字
    showError: true,          // 显示错误
    timeout: 10000            // 超时时间
  })
}
```

---

## 📝 响应格式

### 成功响应
```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 响应数据
  }
}
```

### 错误响应
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

---

## 🎯 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 无权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 📚 相关文档

- [API 模块说明](../api/README.md)
- [请求封装说明](../utils/request.js)
- [错误处理说明](../utils/errorHandler.js)

