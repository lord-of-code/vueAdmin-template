const dict = {
  state: {
    provinceId: null,
    cityId: null,
    areaId: null
  },
  mutations: {
    SET_PROVINCE_ID: (state, provinceId) => {
      state.provinceId = provinceId
    },
    SET_CITY_ID: (state, cityId) => {
      state.cityId = cityId
    }
  },
  actions: {
    setProvinceId: ({ commit, state }, provinceId) => {
      commit('SET_PROVINCE_ID', provinceId)
    },
    setCityId: ({ commit, state }, cityId) => {
      commit('SET_CITY_ID', cityId)
    }
  }
}

export default dict
