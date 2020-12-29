import axios from '@/axios'

//获取商品分类
export function getCategoryLst(params) {
  return axios({
    url: '/Goods/getCategoryLst',
    method: 'get',
    params: params
  })
}

//获取分类商品
export function getGoodsByCatId(params, showLoading) {
  return axios({
    url: '/Goods/getGoodsByCatId',
    method: 'get',
    params: params,
    showLoading: showLoading
  })
}

//获取商品详情
export function getGoodsDetailById(params) {
  return axios({
    url: '/Goods/getGoodsDetailById',
    method: 'get',
    params: params
  })
}
