/**
 * 服务相关接口
 */

import { get, post, put, del } from '../utils/request'

/**
 * 获取服务分类列表
 */
export function getServiceCategories() {
  return get('/services/categories')
}

/**
 * 获取服务列表
 * @param {Object} params - 查询参数
 * @param {String} params.categoryId - 分类ID
 * @param {String} params.keyword - 搜索关键词
 */
export function getServiceList(params) {
  return get('/services/list', params)
}

/**
 * 获取服务详情
 * @param {String} serviceId - 服务ID
 */
export function getServiceDetail(serviceId) {
  return get(`/services/${serviceId}`)
}

/**
 * 获取热门服务
 * @param {Number} limit - 数量限制
 */
export function getHotServices(limit = 10) {
  return get('/services/hot', { limit })
}

/**
 * 获取推荐服务
 * @param {Number} limit - 数量限制
 */
export function getRecommendServices(limit = 10) {
  return get('/services/recommend', { limit })
}

/**
 * 收藏服务
 * @param {String} serviceId - 服务ID
 */
export function favoriteService(serviceId) {
  return post(`/services/${serviceId}/favorite`)
}

/**
 * 取消收藏服务
 * @param {String} serviceId - 服务ID
 */
export function unfavoriteService(serviceId) {
  return del(`/services/${serviceId}/favorite`)
}

/**
 * 获取收藏的服务列表
 * @param {Object} params - 查询参数
 */
export function getFavoriteServices(params) {
  return get('/services/favorites', params)
}

/**
 * 获取售前咨询列表
 * @param {Object} params - 查询参数
 */
export function getPresalesList(params) {
  return get('/services/presales/list', params)
}

/**
 * 创建售前咨询
 * @param {Object} data - 咨询数据
 * @param {String} data.serviceId - 服务ID
 * @param {String} data.content - 咨询内容
 * @param {String} data.contact - 联系方式
 */
export function createPresales(data) {
  return post('/services/presales/create', data)
}

/**
 * 获取售后服务列表
 * @param {Object} params - 查询参数
 */
export function getAftersalesList(params) {
  return get('/services/aftersales/list', params)
}

/**
 * 创建售后服务
 * @param {Object} data - 售后数据
 * @param {String} data.orderId - 订单ID
 * @param {String} data.type - 售后类型：repair-维修, replace-更换, refund-退款
 * @param {String} data.reason - 售后原因
 * @param {Array} data.images - 问题图片
 */
export function createAftersales(data) {
  return post('/services/aftersales/create', data)
}

/**
 * 获取售后详情
 * @param {String} aftersalesId - 售后ID
 */
export function getAftersalesDetail(aftersalesId) {
  return get(`/services/aftersales/${aftersalesId}`)
}

/**
 * 更新售后状态
 * @param {String} aftersalesId - 售后ID
 * @param {Object} data - 状态数据
 */
export function updateAftersalesStatus(aftersalesId, data) {
  return put(`/services/aftersales/${aftersalesId}/status`, data)
}

/**
 * 取消售后
 * @param {String} aftersalesId - 售后ID
 */
export function cancelAftersales(aftersalesId) {
  return put(`/services/aftersales/${aftersalesId}/cancel`)
}

/**
 * 评价服务
 * @param {String} serviceId - 服务ID
 * @param {Object} data - 评价数据
 * @param {Number} data.rating - 评分 1-5
 * @param {String} data.comment - 评价内容
 */
export function rateService(serviceId, data) {
  return post(`/services/${serviceId}/rate`, data)
}

/**
 * 获取服务评价列表
 * @param {String} serviceId - 服务ID
 * @param {Object} params - 查询参数
 */
export function getServiceRatings(serviceId, params) {
  return get(`/services/${serviceId}/ratings`, params)
}

