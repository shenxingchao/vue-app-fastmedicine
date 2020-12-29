import axios from '@/axios'

//获取购物车列表
export function getCartLst(params) {
  return axios({
    url: '/Cart/getCartLst',
    method: 'get',
    params: params
  })
}
