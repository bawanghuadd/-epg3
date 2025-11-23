# API 接口文档

本目录包含所有 API 接口的定义和封装，按功能模块分类管理。

## 📁 目录结构

```
api/
├── index.js          # 统一导出入口
├── user.js           # 用户相关接口
├── order.js          # 订单相关接口
├── message.js        # 消息相关接口
├── service.js        # 服务相关接口
├── common.js         # 通用接口
└── README.md         # 说明文档
```

## 📦 模块说明

### user.js - 用户相关接口
- 登录/注册/登出
- 用户信息获取和更新
- 实名认证
- 手机号绑定
- 密码修改
- 验证码发送

### order.js - 订单相关接口
- 订单创建/查询/取消/删除
- 订单状态更新
- 订单统计
- 订单评价
- 退款申请
- 订单时间线
- 工程师接单/完成订单

### message.js - 消息相关接口
- 消息列表/详情
- 消息已读标记
- 消息删除
- 未读消息数量
- 消息统计
- 消息发送（客服）
- 消息设置

### service.js - 服务相关接口
- 服务分类/列表/详情
- 热门服务/推荐服务
- 服务收藏
- 售前咨询
- 售后服务
- 服务评价

### common.js - 通用接口
- 文件上传
- 地区数据
- 配置信息
- 字典数据
- 意见反馈
- 版本检查
- 协议内容
- 搜索功能

## 📖 使用方法

### 1. 按需导入

```javascript
// 导入单个接口
import { getUserInfo, updateUserInfo } from '@/api/user'
import { getOrderList, createOrder } from '@/api/order'

// 使用接口
async function fetchData() {
  const userInfo = await getUserInfo()
  const orders = await getOrderList({ page: 1 })
}
```

### 2. 模块导入

```javascript
// 导入整个模块
import { userApi, orderApi } from '@/api'

// 使用接口
async function fetchData() {
  const userInfo = await userApi.getUserInfo()
  const orders = await orderApi.getOrderList({ page: 1 })
}
```

### 3. 全部导入

```javascript
// 导入所有接口
import * as api from '@/api'

// 使用接口
async function fetchData() {
  const userInfo = await api.getUserInfo()
  const orders = await api.getOrderList({ page: 1 })
}
```

## 🎯 接口规范

### 1. 命名规范
- 获取列表：`getXxxList`
- 获取详情：`getXxxDetail` 或 `getXxx`
- 创建：`createXxx`
- 更新：`updateXxx`
- 删除：`deleteXxx`
- 特殊操作：动词开头，如 `cancelOrder`、`favoriteService`

### 2. 参数规范
- GET 请求：使用 `params` 对象
- POST/PUT 请求：使用 `data` 对象
- 路径参数：直接作为函数参数

```javascript
// GET 请求
export function getOrderList(params) {
  return get('/orders/list', params)
}

// POST 请求
export function createOrder(data) {
  return post('/orders/create', data)
}

// 路径参数 + 请求体
export function updateOrderStatus(orderId, data) {
  return put(`/orders/${orderId}/status`, data)
}
```

### 3. 注释规范
每个接口都应该包含：
- 功能说明
- 参数说明（使用 JSDoc）
- 返回值说明（可选）

```javascript
/**
 * 创建订单
 * @param {Object} data - 订单数据
 * @param {String} data.serviceId - 服务ID
 * @param {String} data.address - 服务地址
 * @param {String} data.contact - 联系方式
 * @returns {Promise} 返回订单信息
 */
export function createOrder(data) {
  return post('/orders/create', data, {
    showLoading: true,
    loadingText: '提交中...'
  })
}
```

## 🔧 配置说明

### 请求配置
可以为每个接口单独配置请求选项：

```javascript
export function createOrder(data) {
  return post('/orders/create', data, {
    showLoading: true,        // 显示加载提示
    loadingText: '提交中...', // 加载提示文字
    showError: true,          // 显示错误提示
    timeout: 10000            // 超时时间
  })
}
```

### 全局配置
在 `utils/request.js` 中配置全局请求参数：
- baseURL：API 基础地址
- timeout：超时时间
- header：请求头
- 拦截器：请求/响应拦截

## 📝 最佳实践

### 1. 错误处理
```javascript
async function fetchUserInfo() {
  try {
    const result = await getUserInfo()
    console.log('用户信息:', result)
  } catch (error) {
    console.error('获取用户信息失败:', error)
    uni.showToast({
      title: error.message || '获取失败',
      icon: 'none'
    })
  }
}
```

### 2. 加载状态
```javascript
export default {
  data() {
    return {
      loading: false,
      orderList: []
    }
  },
  methods: {
    async fetchOrders() {
      this.loading = true
      try {
        const result = await getOrderList({ page: 1 })
        this.orderList = result.list
      } finally {
        this.loading = false
      }
    }
  }
}
```

### 3. 结合 Vuex
```javascript
// 在 store/modules/order.js 中
import { getOrderList, createOrder } from '@/api/order'

const actions = {
  async fetchOrderList({ commit }, params) {
    const result = await getOrderList(params)
    commit('SET_ORDER_LIST', result.list)
    return result
  },
  
  async createOrder({ commit }, data) {
    const result = await createOrder(data)
    commit('ADD_ORDER', result)
    return result
  }
}
```

## 🚀 扩展指南

### 添加新接口
1. 确定接口所属模块
2. 在对应模块文件中添加接口定义
3. 添加完整的注释说明
4. 在 `index.js` 中导出（如果使用模块导出方式）

### 添加新模块
1. 创建新的模块文件，如 `payment.js`
2. 按照规范定义接口
3. 在 `index.js` 中导出模块
4. 更新本文档

## 📚 相关文档

- [request.js 封装说明](../utils/request.js)
- [API 配置说明](../config/index.js)
- [错误处理说明](../utils/errorHandler.js)

