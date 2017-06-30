<template>
  <div class="cash_manage">
    <banner></banner>
    <el-table :data="fundData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="fundnumber" label="基金编号"></el-table-column>
      <el-table-column property="yesterday_rose" label="昨日涨幅"></el-table-column>
      <el-table-column property="week_rose" label="本周涨幅"></el-table-column>
      <el-table-column property="month_rose" label="本月涨幅"></el-table-column>
      <el-table-column property="trimonth_rose" label="三个月涨幅"></el-table-column>
      <el-table-column property="halfyear_rose" label="半年涨幅"></el-table-column>
      <el-table-column property="allyear_rose" label="今年涨幅"></el-table-column>
      <el-table-column property="lastyear_rose" label="去年涨幅"></el-table-column>
      <el-table-column property="triyear_rose" label="三年涨幅"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  export default {
    data () {
      return {
        fundData: [],
        offset: 0,
        limit: 20,
        count: 1000,
        currentPage: 1
      }
    },
    created () {
      this.$http.post('/api/fundProduct').then((response) => {
        console.log(response.body)
        this.fundData = response.body
      })
    },
    method: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.getUsers()
      }
    },
    components: {
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
