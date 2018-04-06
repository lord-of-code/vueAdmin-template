import { login } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import KeyCloak from 'keycloak-js'

const user = {
  state: {
    token: Cookies.get('user-token'),
    keycloak: new KeyCloak({ url: process.env.LOGIN_DOMAIN + '/auth', realm: 'loc', clientId: 'adminweb' }),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: []
  },

  mutations: {
    INIT_KEYCLOAK: (state, data) => {
      // debugger
      state.keycloak.init({
        token: data.access_token,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        timeSkew: 0,
        checkLoginIframe: false
      })
      state.keycloak.onAuthRefreshSuccess = () => {
        state.token = state.keycloak.token
        setToken(state)
      }
      setInterval(() => {
        state.keycloak.updateToken(30).success(refreshed => {
          if (refreshed) {
            console.log('token auto refreshed')
          } else {
            console.log('Token not refreshed, valid for ' + Math.round(state.keycloak.tokenParsed.exp + state.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
          }
        }).error(() => {
          console.log('Failed to refresh token')
        })
      }, 10000)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit, state }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          debugger
          const data = response.data
          commit('INIT_KEYCLOAK', data)
          commit('SET_TOKEN', data.access_token)
          commit('SET_NAME', username)
          setToken(state)
          resolve()
        }).catch(error => {
          console.info(error)
          removeToken()
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('INIT_KEYCLOAK', {
          access_token: Cookies.get('user-token'),
          refresh_token: Cookies.get('user-refresh-token'),
          id_token: Cookies.get('user-id-token')
        })

        if (state.keycloak.isTokenExpired()) {
          removeToken()
          commit('SET_TOKEN', '')
          return reject('解析用户信息失败')
        }
        commit('SET_ROLES', state.keycloak.resourceAccess.adminweb.roles)
        commit('SET_TOKEN', state.keycloak.token)
        commit('SET_NAME', state.keycloak.tokenParsed.preferred_username)
        return resolve(state.keycloak.resourceAccess.adminweb.roles)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Cookies.remove('user-token')
        resolve()
      })
    }
  }
}

export default user
