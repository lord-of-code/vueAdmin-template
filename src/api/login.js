import request from '@/utils/request'

export function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('client_id', 'adminweb')
  params.append('grant_type', 'password')
  return request({
    url: process.env.LOGIN_DOMAIN + '/auth/realms/loc/protocol/openid-connect/token',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: params
  })
}
