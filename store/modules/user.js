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
  mockUserType: ''
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
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
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
  token: state => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

