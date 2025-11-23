/**
 * 项目配置文件
 */

// API 基础配置
export const API_CONFIG = {
  baseURL: 'http://192.168.31.61',
  timeout: 10000,
  uploadURL: 'http://192.168.31.61/upload'
}

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  CITY: 'city'
}

// 用户类型
export const USER_TYPES = {
  CUSTOMER: 'customer',
  ENGINEER: 'engineer'
}

// 订单状态
export const ORDER_STATUS = {
  PENDING_PAYMENT: 1,      // 待付款
  PENDING_ACCEPT: 2,        // 待接单
  PENDING_SIGN: 3,          // 待签约
  PENDING_SERVICE: 4,       // 待服务
  IN_SERVICE: 5,            // 服务中
  PENDING_CONFIRM: 6,       // 待确认
  COMPLETED: 7,             // 已完成
  AFTER_SALE: 8,            // 售后中
  CANCELLED: 9              // 已取消
}

// 订单状态文本映射
export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING_PAYMENT]: '待付款',
  [ORDER_STATUS.PENDING_ACCEPT]: '待接单',
  [ORDER_STATUS.PENDING_SIGN]: '待签约',
  [ORDER_STATUS.PENDING_SERVICE]: '待服务',
  [ORDER_STATUS.IN_SERVICE]: '服务中',
  [ORDER_STATUS.PENDING_CONFIRM]: '待确认',
  [ORDER_STATUS.COMPLETED]: '已完成',
  [ORDER_STATUS.AFTER_SALE]: '售后中',
  [ORDER_STATUS.CANCELLED]: '已取消'
}

// 服务类型
export const SERVICE_TYPES = {
  AFTER_SALE: 1,    // 找售后
  PRE_SALE: 2,      // 找售前
  TEAM: 3,          // 找团队
  PROJECT: 4        // 售后工程
}

// 服务类型文本映射
export const SERVICE_TYPE_TEXT = {
  [SERVICE_TYPES.AFTER_SALE]: '找售后',
  [SERVICE_TYPES.PRE_SALE]: '找售前',
  [SERVICE_TYPES.TEAM]: '找团队',
  [SERVICE_TYPES.PROJECT]: '售后工程'
}

// 业务领域映射
export const BUSINESS_DOMAINS = {
  1: '场站充电桩',
  2: '智慧交管',
  3: '智慧园区',
  4: '智慧体育',
  5: '智慧警务',
  6: '应急消防',
  7: '出入口通道',
  8: 'AGV机器人',
  9: '大楼弱电',
  10: '代收货款',
  11: '扫码下单',
  12: '找团队'
}

// 路由路径
export const ROUTES = {
  LOGIN: '/pages/index/index',
  HOME: '/pages/home/home',
  ENGINEER_HOME: '/pages/engineer/home',
  ORDER_LIST: '/pages/order/order',
  ORDER_CREATE: '/pages/order/create',
  MESSAGE: '/pages/message/message',
  PROFILE: '/pages/profile/profile',
  VERIFY: '/pages/profile/verify',
  PRESALES: '/pages/service/presales',
  AFTERSALES: '/pages/service/aftersales'
}

// 页面配置
export const PAGE_CONFIG = {
  TAB_BAR_HEIGHT: 56,  // 底部导航栏高度（rpx）
  SAFE_AREA_BOTTOM: 'env(safe-area-inset-bottom)',
  SAFE_AREA_TOP: 'env(safe-area-inset-top)'
}

// 图片上传配置
export const UPLOAD_CONFIG = {
  MAX_COUNT: 6,
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPT: ['image/jpeg', 'image/png', 'image/jpg']
}

// 验证规则
export const VALIDATION_RULES = {
  PHONE: /^1[3-9]\d{9}$/,
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
}

