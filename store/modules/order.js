/**
 * 订单状态管理模块
 * 管理订单列表、订单详情、订单筛选等
 */

const state = {
  // 订单列表
  orderList: [],
  // 当前订单详情
  currentOrder: null,
  // 订单筛选条件
  filterStatus: 'all', // all, pending, processing, completed, cancelled
  // 订单统计
  orderStats: {
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0
  },
  // 分页信息
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0
  },
  // 加载状态
  loading: false
}

const mutations = {
  /**
   * 设置订单列表
   */
  SET_ORDER_LIST(state, orders) {
    state.orderList = orders
  },

  /**
   * 添加订单到列表
   */
  ADD_ORDER(state, order) {
    state.orderList.unshift(order)
  },

  /**
   * 更新订单
   */
  UPDATE_ORDER(state, order) {
    const index = state.orderList.findIndex(item => item.id === order.id)
    if (index !== -1) {
      state.orderList.splice(index, 1, order)
    }
  },

  /**
   * 删除订单
   */
  DELETE_ORDER(state, orderId) {
    const index = state.orderList.findIndex(item => item.id === orderId)
    if (index !== -1) {
      state.orderList.splice(index, 1)
    }
  },

  /**
   * 设置当前订单详情
   */
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order
  },

  /**
   * 设置筛选状态
   */
  SET_FILTER_STATUS(state, status) {
    state.filterStatus = status
  },

  /**
   * 设置订单统计
   */
  SET_ORDER_STATS(state, stats) {
    state.orderStats = stats
  },

  /**
   * 设置分页信息
   */
  SET_PAGINATION(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination }
  },

  /**
   * 设置加载状态
   */
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  /**
   * 获取订单列表
   */
  async fetchOrderList({ commit, state }, { page = 1, status = 'all' } = {}) {
    commit('SET_LOADING', true)
    try {
      // TODO: 调用订单列表接口
      const response = await uni.request({
        url: '/api/orders',
        method: 'GET',
        data: {
          page,
          pageSize: state.pagination.pageSize,
          status: status === 'all' ? '' : status
        }
      })

      if (response.data.code === 200) {
        const { list, total } = response.data.data
        commit('SET_ORDER_LIST', list)
        commit('SET_PAGINATION', { page, total })
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('获取订单列表失败:', error)
      return { success: false, message: '获取订单列表失败' }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  /**
   * 获取订单详情
   */
  async fetchOrderDetail({ commit }, orderId) {
    try {
      // TODO: 调用订单详情接口
      const response = await uni.request({
        url: `/api/orders/${orderId}`,
        method: 'GET'
      })

      if (response.data.code === 200) {
        commit('SET_CURRENT_ORDER', response.data.data)
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('获取订单详情失败:', error)
      return { success: false, message: '获取订单详情失败' }
    }
  },

  /**
   * 创建订单
   */
  async createOrder({ commit }, orderData) {
    try {
      // TODO: 调用创建订单接口
      const response = await uni.request({
        url: '/api/orders',
        method: 'POST',
        data: orderData
      })

      if (response.data.code === 200) {
        commit('ADD_ORDER', response.data.data)
        return { success: true, data: response.data.data }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('创建订单失败:', error)
      return { success: false, message: '创建订单失败' }
    }
  },

  /**
   * 更新订单状态
   */
  async updateOrderStatus({ commit }, { orderId, status }) {
    try {
      // TODO: 调用更新订单状态接口
      const response = await uni.request({
        url: `/api/orders/${orderId}/status`,
        method: 'PUT',
        data: { status }
      })

      if (response.data.code === 200) {
        commit('UPDATE_ORDER', response.data.data)
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('更新订单状态失败:', error)
      return { success: false, message: '更新订单状态失败' }
    }
  },

  /**
   * 取消订单
   */
  async cancelOrder({ commit }, orderId) {
    try {
      // TODO: 调用取消订单接口
      const response = await uni.request({
        url: `/api/orders/${orderId}/cancel`,
        method: 'PUT'
      })

      if (response.data.code === 200) {
        commit('UPDATE_ORDER', response.data.data)
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('取消订单失败:', error)
      return { success: false, message: '取消订单失败' }
    }
  },

  /**
   * 获取订单统计
   */
  async fetchOrderStats({ commit }) {
    try {
      // TODO: 调用订单统计接口
      const response = await uni.request({
        url: '/api/orders/stats',
        method: 'GET'
      })

      if (response.data.code === 200) {
        commit('SET_ORDER_STATS', response.data.data)
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('获取订单统计失败:', error)
      return { success: false, message: '获取订单统计失败' }
    }
  }
}

const getters = {
  // 订单列表
  orderList: state => state.orderList,
  // 筛选后的订单列表
  filteredOrderList: state => {
    if (state.filterStatus === 'all') {
      return state.orderList
    }
    return state.orderList.filter(order => order.status === state.filterStatus)
  },
  // 当前订单
  currentOrder: state => state.currentOrder,
  // 订单统计
  orderStats: state => state.orderStats,
  // 加载状态
  loading: state => state.loading
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

