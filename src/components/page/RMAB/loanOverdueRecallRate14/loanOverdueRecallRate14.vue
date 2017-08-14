<template>
  <div class="loanOverdueRecallRate14" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <el-table :data="fundData" highlight-current-row border
              style="width: 100%;overflow: auto;" :height="height" class="loanOverdueRecallRate14Table">
      <el-table-column property="rownum" :label="labels[0]+''" width="1"></el-table-column>
      <el-table-column property="AA" :label="labels[1]" width="160px"></el-table-column>
      <el-table-column property="D1" :label="labels[2]"></el-table-column>
      <el-table-column property="D2" :label="labels[3]"></el-table-column>
      <el-table-column property="D3" :label="labels[4]"></el-table-column>
      <el-table-column property="D4" :label="labels[5]"></el-table-column>
      <el-table-column property="D5" :label="labels[6]"></el-table-column>
      <el-table-column property="D6" :label="labels[7]"></el-table-column>
      <el-table-column property="D7" :label="labels[8]"></el-table-column>
      <el-table-column property="DOD" :label="labels[9]"></el-table-column>
      <el-table-column property="W1" :label="labels[10]"></el-table-column>
      <el-table-column property="W2" :label="labels[11]"></el-table-column>
      <el-table-column property="W3" :label="labels[12]"></el-table-column>
      <el-table-column property="W4" :label="labels[13]"></el-table-column>
      <el-table-column property="WOW" :label="labels[14]"></el-table-column>
      <el-table-column property="M1" :label="labels[15]"></el-table-column>
      <el-table-column property="M2" :label="labels[16]"></el-table-column>
      <el-table-column property="M3" :label="labels[17]"></el-table-column>
      <el-table-column property="MOM" :label="labels[18]"></el-table-column>
    </el-table>
    <p class="loanOverdueRecallRate14Info">说明:</p>
    <p class="loanOverdueRecallRate14Info">数据同环比计算公式: (本期数据-对照数据)/对照数据</p>
    <p class="loanOverdueRecallRate14Info">百分比同环比计算公式: 本期百分比-对照百分比</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  import { getProperty } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'
  import $ from 'jquery'

  export default {
    data () {
      return {
        labels: [],
        fundData: [],
        loading: false,
        height: 500
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.height = parseInt(getHeight()) + 60
      this.getData()
      console.log(111)
    },
    methods: {
      getData () {
        this.axios.post('/api/loanOverdueRecallRate14').then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.labels = ['', '指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']
            this.loading = false
            this.$message({
              message: '请求超时，请重试',
              type: 'warning'
            })
          } else {
            this.fundData = response.data.slice(1)
            this.labels = getProperty(response.data[0])
            this.loading = false
          }
        }).catch(() => {
          this.fundData = []
          this.labels = ['', '指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      }
    },
    updated () {
      $('.el-table__row:eq(1)').click(function () {
        $('.el-table__row:eq(2)').css('display', 'none')
        $('.el-table__row:eq(3)').css('display', 'none')
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loanOverdueRecallRate14
    .el-table__row:nth-child(1), .el-table__row:nth-child(2), .el-table__row:nth-child(5), .el-table__row:nth-child(8), .el-table__row:nth-child(11), .el-table__row:nth-child(14), .el-table__row:nth-child(17), .el-table__row:nth-child(20), .el-table__row:nth-child(23), .el-table__row:nth-child(26), .el-table__row:nth-child(29), .el-table__row:nth-child(32), .el-table__row:nth-child(35), .el-table__row:nth-child(38), .el-table__row:nth-child(39), .el-table__row:nth-child(40), .el-table__row:nth-child(41), .el-table__row:nth-child(42)
      background-color: #ced9e6

  .loanOverdueRecallRate14Info
    padding-top: 5px
    font-size: 12px
    color: red
</style>
