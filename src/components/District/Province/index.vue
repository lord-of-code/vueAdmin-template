<template>
  <el-select v-model="provinceId" @change="handleCurrentChange" filterable placeholder="请选择省份">
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
    this.getDistrict()
  },
  data() {
    return {
      options: [],
      provinceId: null,
      district: {
        type: 0
      }
    }
  },
  methods: {
    getDistrict() {
      getDistrict(this.district).then(response => {
        this.options = response.data.data
      })
    },
    handleCurrentChange() {
      this.$store.dispatch('setProvinceId', this.provinceId)
    }
  }
}
</script>