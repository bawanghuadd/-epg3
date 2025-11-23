/**
 * 应用状态管理模块
 * 管理应用全局状态、系统配置、网络状态等
 */

const state = {
  // 应用配置
  config: {
    appName: 'EPG3',
    version: '1.0.0',
    apiBaseUrl: ''
  },
  // 系统信息
  systemInfo: {},
  // 网络状态
  networkStatus: {
    isConnected: true,
    networkType: 'wifi'
  },
  // 加载状态
  globalLoading: false,
  // 当前页面路径
  currentPage: '',
  // TabBar 选中索引
  tabBarIndex: 0,
  // 主题模式
  theme: 'light', // light, dark
  // 语言
  language: 'zh-CN'
}

const mutations = {
  /**
   * 设置应用配置
   */
  SET_CONFIG(state, config) {
    state.config = { ...state.config, ...config }
  },

  /**
   * 设置系统信息
   */
  SET_SYSTEM_INFO(state, info) {
    state.systemInfo = info
  },

  /**
   * 设置网络状态
   */
  SET_NETWORK_STATUS(state, status) {
    state.networkStatus = { ...state.networkStatus, ...status }
  },

  /**
   * 设置全局加载状态
   */
  SET_GLOBAL_LOADING(state, loading) {
    state.globalLoading = loading
  },

  /**
   * 设置当前页面
   */
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },

  /**
   * 设置 TabBar 索引
   */
  SET_TAB_BAR_INDEX(state, index) {
    state.tabBarIndex = index
  },

  /**
   * 设置主题
   */
  SET_THEME(state, theme) {
    state.theme = theme
    uni.setStorageSync('theme', theme)
  },

  /**
   * 设置语言
   */
  SET_LANGUAGE(state, language) {
    state.language = language
    uni.setStorageSync('language', language)
  }
}

const actions = {
  /**
   * 初始化应用
   */
  async initApp({ commit, dispatch }) {
    try {
      // 获取系统信息
      const systemInfo = uni.getSystemInfoSync()
      commit('SET_SYSTEM_INFO', systemInfo)

      // 获取网络状态
      uni.getNetworkType({
        success: (res) => {
          commit('SET_NETWORK_STATUS', {
            isConnected: res.networkType !== 'none',
            networkType: res.networkType
          })
        }
      })

      // 监听网络状态变化
      uni.onNetworkStatusChange((res) => {
        commit('SET_NETWORK_STATUS', {
          isConnected: res.isConnected,
          networkType: res.networkType
        })
      })

      // 从本地存储恢复主题和语言设置
      const theme = uni.getStorageSync('theme') || 'light'
      const language = uni.getStorageSync('language') || 'zh-CN'
      commit('SET_THEME', theme)
      commit('SET_LANGUAGE', language)

      return { success: true }
    } catch (error) {
      console.error('应用初始化失败:', error)
      return { success: false, message: '应用初始化失败' }
    }
  },

  /**
   * 显示全局加载
   */
  showLoading({ commit }, title = '加载中...') {
    commit('SET_GLOBAL_LOADING', true)
    uni.showLoading({ title, mask: true })
  },

  /**
   * 隐藏全局加载
   */
  hideLoading({ commit }) {
    commit('SET_GLOBAL_LOADING', false)
    uni.hideLoading()
  },

  /**
   * 切换主题
   */
  toggleTheme({ commit, state }) {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    commit('SET_THEME', newTheme)
  },

  /**
   * 切换语言
   */
  changeLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

const getters = {
  // 应用配置
  config: state => state.config,
  // 系统信息
  systemInfo: state => state.systemInfo,
  // 网络是否连接
  isNetworkConnected: state => state.networkStatus.isConnected,
  // 网络类型
  networkType: state => state.networkStatus.networkType,
  // 全局加载状态
  globalLoading: state => state.globalLoading,
  // 当前主题
  theme: state => state.theme,
  // 是否暗色主题
  isDarkTheme: state => state.theme === 'dark',
  // 当前语言
  language: state => state.language
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

