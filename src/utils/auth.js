import Cookies from 'js-cookie'

export function setToken(state) {
  debugger
  Cookies.set('user-token', state.keycloak.token)
  Cookies.set('user-refresh-token', state.keycloak.refreshToken)
  Cookies.set('user-id-token', state.keycloak.token)
}

export function removeToken() {
  Cookies.remove('user-token')
  Cookies.remove('user-refresh-token')
  Cookies.remove('user-id-token')
}
