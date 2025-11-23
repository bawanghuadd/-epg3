# Store 状态管理

本目录使用 Vuex 模式进行状态管理，集中管理应用的所有状态。

## 📁 目录结构

```
store/
├── index.js              # Store 入口文件
├── modules/              # Store 模块
│   ├── user.js          # 用户模块
│   ├── order.js         # 订单模块
│   └── app.js           # 应用模块
├── plugins/              # Store 插件
│   └── persistence.js   # 持久化插件
└── README.md            # 说明文档
```

## 📦 模块说明

### user.js - 用户模块
管理用户相关状态：
- 用户信息
- 登录状态
- 用户角色（客户端/工程师端）
- 权限列表
- Token
- 模拟登录状态

### order.js - 订单模块
管理订单相关状态：
- 订单列表
- 订单详情
- 订单筛选
- 订单统计
- 分页信息

### app.js - 应用模块
管理应用全局状态：
- 应用配置
- 系统信息
- 网络状态
- 全局加载状态
- 主题模式
- 语言设置

## 🔌 插件说明

### persistence.js - 持久化插件
自动将指定模块的状态保存到本地存储，应用重启后自动恢复。

## 📖 使用方法

### 1. 在 main.uts 中引入

```javascript
import store from './store/index.js'

// 创建应用实例时传入 store
const app = createApp({
  store
})
```

### 2. 在页面中使用

```javascript
export default {
  computed: {
    // 获取用户信息
    userInfo() {
      return this.$store.getters['user/userInfo']
    },
    // 获取订单列表
    orderList() {
      return this.$store.getters['order/orderList']
    }
  },
  methods: {
    // 调用 action
    async login() {
      const result = await this.$store.dispatch('user/login', {
        username: 'test',
        password: '123456'
      })
      if (result.success) {
        console.log('登录成功')
      }
    },
    // 提交 mutation
    setUserInfo(userInfo) {
      this.$store.commit('user/SET_USER_INFO', userInfo)
    }
  }
}
```

### 3. 使用 mapState、mapGetters、mapActions

```javascript
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['userInfo', 'isLoggedIn']),
    ...mapGetters('order', ['orderList', 'orderStats'])
  },
  methods: {
    ...mapActions('user', ['login', 'logout']),
    ...mapActions('order', ['fetchOrderList', 'createOrder'])
  }
}
```

## 🎯 最佳实践

1. **模块化管理**：按功能模块划分 store，每个模块独立管理自己的状态
2. **命名空间**：所有模块都使用 `namespaced: true`，避免命名冲突
3. **异步操作**：所有异步操作都放在 actions 中，mutations 只做同步操作
4. **Getters 复用**：使用 getters 计算派生状态，避免重复计算
5. **持久化**：重要状态使用持久化插件自动保存

## 📝 注意事项

1. 不要在 mutations 中执行异步操作
2. 不要直接修改 state，必须通过 mutations
3. actions 可以包含任意异步操作
4. 使用常量定义 mutation 类型（可选）
5. 保持 state 结构扁平化，避免深层嵌套

