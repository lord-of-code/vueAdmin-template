<template>
  <span style="margin-bottom: 40px;" class="district-font">
    城市
    <el-select v-model="cityId" filterable @change="handleCurrentChange" @visible-change="getCity" placeholder="请选择城市">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </span>
</template>

<script>

import { getDistrict } from '@/api/district'

export default {
  mounted() {
    this.getCity()
  },
  data() {
    return {
      options: [],
      cityId: null,
      district: {
        type: 1,
        parentId: null
      }
    }
  },
  methods: {
    getCity() {
      this.district.parentId = this.$store.state.dict.provinceId
      getDistrict(this.district).then(response => {
        this.options = response.data.data
      })
    },
    handleCurrentChange() {
      this.$store.dispatch('setCityId', this.cityId)
    }
  }
}
</script>