import request from '@/utils/request'

export function getDistrict(params) {
  return request({
    url: process.env.BASIC_DOMAIN + '/district/getDistrict',
    method: 'get',
    params
  })
}
