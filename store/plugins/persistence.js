/**
 * Vuex 持久化插件
 * 自动将指定的 state 保存到本地存储
 */

/**
 * 创建持久化插件
 * @param {Object} options 配置选项
 * @param {Array} options.modules 需要持久化的模块列表
 * @param {String} options.storageKey 存储的 key
 */
export function createPersistencePlugin(options = {}) {
  const {
    modules = ['user', 'app'],
    storageKey = 'vuex_state'
  } = options

  return store => {
    // 从本地存储恢复状态
    try {
      const savedState = uni.getStorageSync(storageKey)
      if (savedState) {
        const state = JSON.parse(savedState)
        modules.forEach(moduleName => {
          if (state[moduleName]) {
            store.replaceState({
              ...store.state,
              [moduleName]: {
                ...store.state[moduleName],
                ...state[moduleName]
              }
            })
          }
        })
      }
    } catch (error) {
      console.error('恢复状态失败:', error)
    }

    // 监听状态变化并保存
    store.subscribe((mutation, state) => {
      try {
        const stateToSave = {}
        modules.forEach(moduleName => {
          if (state[moduleName]) {
            stateToSave[moduleName] = state[moduleName]
          }
        })
        uni.setStorageSync(storageKey, JSON.stringify(stateToSave))
      } catch (error) {
        console.error('保存状态失败:', error)
      }
    })
  }
}

export default createPersistencePlugin

