<template>
  <span style="margin-bottom: 40px;" class="district-font">
    区域
    <el-select v-model="regionId" filterable @change="handleCurrentChange" @visible-change="getArea" placeholder="请选择区域">
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
    this.getArea()
  },
  data() {
    return {
      options: [],
      regionId: null,
      district: {
        type: 2,
        parentId: null
      }
    }
  },
  methods: {
    getArea() {
      this.district.parentId = this.$store.state.dict.cityId
      getDistrict(this.district).then(response => {
        this.options = response.data.data
      })
    },
    handleCurrentChange() {
      this.$store.dispatch('setRegionId', this.regionId)
    }
  }
}
</script>