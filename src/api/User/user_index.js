import axios from '@/axios'

//获取用户信息
export function getUserInfo(params) {
  return axios({
    url: '/User/getUserInfo',
    method: 'get',
    params: params
  })
}
