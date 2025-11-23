/**
 * API 接口统一导出
 * 方便统一管理和引用
 */

// 用户相关接口
export * from './user'

// 订单相关接口
export * from './order'

// 消息相关接口
export * from './message'

// 服务相关接口
export * from './service'

// 通用接口
export * from './common'

// 也可以按模块导出
import * as userApi from './user'
import * as orderApi from './order'
import * as messageApi from './message'
import * as serviceApi from './service'
import * as commonApi from './common'

export {
  userApi,
  orderApi,
  messageApi,
  serviceApi,
  commonApi
}

