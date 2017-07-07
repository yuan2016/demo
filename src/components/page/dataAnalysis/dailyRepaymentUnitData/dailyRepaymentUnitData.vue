<template>
  <div class="dailyRepaymentUnitData">
    <banner></banner>
    <el-table :data="fundData" highlight-current-row border height="800" style="width: 100%">
      <el-table-column property="d_date" label="日期"></el-table-column>
      <el-table-column property="overdue_num" label="逾期单数"></el-table-column>
      <el-table-column property="overdue_rate" label="逾期率"></el-table-column>
      <el-table-column property="repayment_rate" label="还款率"></el-table-column>
      <el-table-column property="overdue_num_7day" label="7天期限逾期单数"></el-table-column>
      <el-table-column property="overdue_rate_7day" label="7天期限逾期率"></el-table-column>
      <el-table-column property="overdue_num_14day" label="14天期限逾期单数"></el-table-column>
      <el-table-column property="overdue_rate_14day" label="14天期限逾期率"></el-table-column>
      <el-table-column property="overdue_rate_ouser" label="老用户逾期率"></el-table-column>
      <el-table-column property="repayment_rate_ouser" label="老用户还款率"></el-table-column>
      <el-table-column property="overdue_rate_nuser" label="新用户逾期率"></el-table-column>
      <el-table-column property="repayment_rate_nuser" label="新用户还款率"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  export default {
    data () {
      return {
        fundData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
      }
    },
    components: {
      banner
    },
    created () {
      this.axios.post('/api/dailyRepaymentUnitData/count').then((response) => {
        this.count = response.data[0].count
      })
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        console.log(this.offset)
        console.log(this.pageSize)
        this.getData()
      },
      getData () {
        this.axios.post('/api/dailyRepaymentUnitData', {
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          console.log(response.data)
          this.fundData = response.data
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-col-4
    width: 10.66667%

  .el-col-20
    width: 89.33333%

  .el-table .cell,.el-table th>div
    padding-left: 0
    padding-right:0
    text-align :center
    font-size:12px

  .el-table th>.cell
    text-align :center
    font-weight:bold
</style>
