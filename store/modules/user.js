/**
 * 用户状态管理模块
 * 管理用户信息、登录状态、权限等
 */

const state = {
  // 用户信息
  userInfo: null,
  // 登录状态
  isLoggedIn: false,
  // 用户角色：client-客户端, engineer-工程师端
  userRole: '',
  // 用户权限列表
  permissions: [],
  // Token
  token: '',
  // 模拟登录状态
  isMockLogin: false,
  mockUserType: '',
  // 工程师认证状态
  engineerVerifyStatus: null, // null-未认证, pending-审核中, approved-已通过, rejected-已拒绝
  engineerVerifyInfo: null // 工程师认证信息
}

const mutations = {
  /**
   * 设置用户信息
   */
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    state.isLoggedIn = !!userInfo
  },

  /**
   * 设置用户角色
   */
  SET_USER_ROLE(state, role) {
    state.userRole = role
  },

  /**
   * 设置用户权限
   */
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },

  /**
   * 设置 Token
   */
  SET_TOKEN(state, token) {
    state.token = token
    // 同步到本地存储
    if (token) {
      uni.setStorageSync('token', token)
    } else {
      uni.removeStorageSync('token')
    }
  },

  /**
   * 设置模拟登录状态
   */
  SET_MOCK_LOGIN(state, { isMock, userType }) {
    state.isMockLogin = isMock
    state.mockUserType = userType
  },

  /**
   * 设置工程师认证状态
   */
  SET_ENGINEER_VERIFY_STATUS(state, status) {
    state.engineerVerifyStatus = status
    // 同步到本地存储
    if (status) {
      uni.setStorageSync('engineerVerifyStatus', status)
    } else {
      uni.removeStorageSync('engineerVerifyStatus')
    }
  },

  /**
   * 设置工程师认证信息
   */
  SET_ENGINEER_VERIFY_INFO(state, info) {
    state.engineerVerifyInfo = info
    // 同步到本地存储
    if (info) {
      uni.setStorageSync('engineerVerifyInfo', info)
    } else {
      uni.removeStorageSync('engineerVerifyInfo')
    }
  },

  /**
   * 清除用户信息
   */
  CLEAR_USER_INFO(state) {
    state.userInfo = null
    state.isLoggedIn = false
    state.userRole = ''
    state.permissions = []
    state.token = ''
    state.isMockLogin = false
    state.mockUserType = ''
    state.engineerVerifyStatus = null
    state.engineerVerifyInfo = null
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('engineerVerifyStatus')
    uni.removeStorageSync('engineerVerifyInfo')
  }
}

const actions = {
  /**
   * 登录
   */
  async login({ commit }, { username, password }) {
    try {
      // TODO: 调用登录接口
      const response = await uni.request({
        url: '/api/login',
        method: 'POST',
        data: { username, password }
      })

      if (response.data.code === 200) {
        const { token, userInfo } = response.data.data
        commit('SET_TOKEN', token)
        commit('SET_USER_INFO', userInfo)
        commit('SET_USER_ROLE', userInfo.role)
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请重试' }
    }
  },

  /**
   * 模拟登录
   */
  mockLogin({ commit }, userType) {
    commit('SET_MOCK_LOGIN', { isMock: true, userType })
    commit('SET_USER_ROLE', userType)
    
    // 设置模拟用户信息
    const mockUserInfo = {
      id: 'mock_' + Date.now(),
      username: userType === 'client' ? '测试客户' : '测试工程师',
      role: userType,
      avatar: ''
    }
    commit('SET_USER_INFO', mockUserInfo)
  },

  /**
   * 退出登录
   */
  logout({ commit }) {
    commit('CLEAR_USER_INFO')
  },

  /**
   * 更新用户信息
   */
  updateUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
    uni.setStorageSync('userInfo', userInfo)
  },

  /**
   * 获取工程师认证状态
   */
  async fetchEngineerVerifyStatus({ commit }) {
    try {
      // TODO: 调用获取认证状态接口
      const response = await uni.request({
        url: '/api/engineer/verify/status',
        method: 'GET'
      })

      if (response.data.code === 200) {
        const { status, verifyInfo } = response.data.data
        commit('SET_ENGINEER_VERIFY_STATUS', status)
        commit('SET_ENGINEER_VERIFY_INFO', verifyInfo)
        return { success: true, status, verifyInfo }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('获取工程师认证状态失败:', error)
      return { success: false, message: '获取认证状态失败' }
    }
  },

  /**
   * 提交工程师认证
   */
  async submitEngineerVerify({ commit }, verifyData) {
    try {
      // TODO: 调用提交认证接口
      const response = await uni.request({
        url: '/api/engineer/verify/submit',
        method: 'POST',
        data: verifyData
      })

      if (response.data.code === 200) {
        commit('SET_ENGINEER_VERIFY_STATUS', 'pending')
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('提交工程师认证失败:', error)
      return { success: false, message: '提交认证失败' }
    }
  },

  /**
   * 从本地存储恢复认证状态
   */
  restoreEngineerVerifyStatus({ commit }) {
    const status = uni.getStorageSync('engineerVerifyStatus')
    const info = uni.getStorageSync('engineerVerifyInfo')
    if (status) {
      commit('SET_ENGINEER_VERIFY_STATUS', status)
    }
    if (info) {
      commit('SET_ENGINEER_VERIFY_INFO', info)
    }
  }
}

const getters = {
  // 是否已登录
  isLoggedIn: state => state.isLoggedIn,
  // 用户信息
  userInfo: state => state.userInfo,
  // 用户角色
  userRole: state => state.userRole,
  // 是否是客户端
  isClient: state => state.userRole === 'client',
  // 是否是工程师
  isEngineer: state => state.userRole === 'engineer',
  // 是否是模拟登录
  isMockLogin: state => state.isMockLogin,
  // Token
  token: state => state.token,
  // 工程师认证状态
  engineerVerifyStatus: state => state.engineerVerifyStatus,
  // 工程师认证信息
  engineerVerifyInfo: state => state.engineerVerifyInfo,
  // 工程师是否已认证通过
  isEngineerVerified: state => state.engineerVerifyStatus === 'approved',
  // 工程师是否在审核中
  isEngineerVerifyPending: state => state.engineerVerifyStatus === 'pending',
  // 工程师是否被拒绝
  isEngineerVerifyRejected: state => state.engineerVerifyStatus === 'rejected',
  // 工程师是否未认证
  isEngineerUnverified: state => !state.engineerVerifyStatus || state.engineerVerifyStatus === 'rejected'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

