<template>
  <div class="cash_manage">
    <banner></banner>
    <el-table :data="netData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="netnumber" label="基金编号"></el-table-column>
      <el-table-column property="yesterday_rose" label="昨日涨幅"></el-table-column>
      <el-table-column property="week_rose" label="本周涨幅"></el-table-column>
      <el-table-column property="month_rose" label="本月涨幅"></el-table-column>
      <el-table-column property="trimonth_rose" label="三个月涨幅"></el-table-column>
      <el-table-column property="halfyear_rose" label="半年涨幅"></el-table-column>
      <el-table-column property="allyear_rose" label="今年涨幅"></el-table-column>
      <el-table-column property="lastyear_rose" label="去年涨幅"></el-table-column>
      <el-table-column property="triyear_rose" label="三年涨幅"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
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
        netData: [{
          netnumber: '001',
          yesterday_rose: '0.1%',
          week_rose: '0.3%',
          month_rose: '0.5%',
          trimonth_rose: '1.3%',
          halfyear_rose: '1.7%',
          allyear_rose: '2.0%',
          lastyear_rose: '-2.3%',
          triyear_rose: '-5.0%'
        }, {
          netnumber: '002',
          yesterday_rose: '0.1%',
          week_rose: '0.3%',
          month_rose: '0.5%',
          trimonth_rose: '1.3%',
          halfyear_rose: '1.7%',
          allyear_rose: '2.0%',
          lastyear_rose: '-2.3%',
          triyear_rose: '-5.0%'
        }, {
          netnumber: '003',
          yesterday_rose: '0.1%',
          week_rose: '0.3%',
          month_rose: '0.5%',
          trimonth_rose: '1.3%',
          halfyear_rose: '1.7%',
          allyear_rose: '2.0%',
          lastyear_rose: '-2.3%',
          triyear_rose: '-5.0%'
        }]
      }
    },
    components: {
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
