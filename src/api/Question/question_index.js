import axios from '@/axios'

//获取医生列表
export function getDoctorLst(params) {
  return axios({
    url: '/Question/getDoctorLst',
    method: 'get',
    params: params
  })
}
