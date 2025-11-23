/**
 * Vuex Store 入口文件
 * 集中管理应用状态
 */

import user from './modules/user.js'
import order from './modules/order.js'
import app from './modules/app.js'

const store = {
  modules: {
    user,
    order,
    app
  }
}

export default store

