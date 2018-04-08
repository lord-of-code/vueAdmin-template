const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  provinceId: state => state.district.provinceId,
  cityId: state => state.district.cityId
}
export default getters
