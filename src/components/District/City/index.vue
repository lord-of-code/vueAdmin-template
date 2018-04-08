<template>
  <el-select v-model="provinceId" filterable @visible-change="getCity" placeholder="请选择城市">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
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
      provinceId: null,
      district: {
        type: 1,
        parentId: null
      }
    }
  },
  methods: {
    getCity() {
      // debugger
      this.district.parentId = this.$store.state.dict.provinceId
      getDistrict(this.district).then(response => {
        this.options = response.data.data
      })
    }
  }
}
</script>