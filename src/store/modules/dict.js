const dict = {
  state: {
    provinceId: null,
    cityId: null,
    regionId: null
  },
  mutations: {
    SET_PROVINCE_ID: (state, provinceId) => {
      state.provinceId = provinceId
    },
    SET_CITY_ID: (state, cityId) => {
      state.cityId = cityId
    },
    SET_REGION_ID: (state, regionId) => {
      state.regionId = regionId
    }
  },
  actions: {
    setProvinceId: ({ commit, state }, provinceId) => {
      commit('SET_PROVINCE_ID', provinceId)
    },
    setCityId: ({ commit, state }, cityId) => {
      commit('SET_CITY_ID', cityId)
    },
    setRegionId: ({ commit, state }, regionId) => {
      commit('SET_REGION_ID', regionId)
    }
  }
}

export default dict
