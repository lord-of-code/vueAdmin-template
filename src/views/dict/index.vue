<template>
  <div class="dict-container">
    <div class="district-container">
      <el-row :gutter="20">
        <el-col :span="5" :offset="3">
          <province></province>
        </el-col>
        <el-col :span="5">
          <city></city>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Province from '@/components/District/Province'
import City from '@/components/District/City'

export default {
  name: 'dict',
  components: { Province, City }
}

</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
