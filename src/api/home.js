import axios from '@/axios'

//获取商品分类列表
export function getCategoryLst(params) {
  return axios({
    url: '/Category/getCategoryLst',
    method: 'get',
    params: params
  })
}
//获取限时优惠商品列表
export function getTimeLimitedDiscountLst(params) {
  return axios({
    url: '/Home/getTimeLimitedDiscountLst',
    method: 'get',
    params: params
  })
}
//获取推荐商品列表
export function getHotRecommendLst(params) {
  return axios({
    url: '/Home/getHotRecommendLst',
    method: 'get',
    params: params
  })
}
