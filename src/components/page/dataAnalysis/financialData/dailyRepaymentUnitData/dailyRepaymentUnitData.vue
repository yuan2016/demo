<template>
  <div class="dailyRepaymentUnitData">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">日期：</span>
      <el-date-picker
        v-model.trim="startTime"
        type="date"
        placeholder="从">
      </el-date-picker>
      <el-date-picker
        v-model.trim="endTime"
        type="date"
        placeholder="到">
      </el-date-picker>
      <el-button type="primary" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 99%;overflow: auto">
      <el-table-column property="d_date" sortable label="日期"></el-table-column>
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
    <div class="pagination" style="text-align: center;margin-top: 10px;">
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
  import banner from '../../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../../common/js/utils'
  export default {
    data () {
      return {
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getCount()
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getData()
      },
      getData () {
        this.axios.post('/api/dailyRepaymentUnitData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      getCount () {
        this.axios.post('/api/dailyRepaymentUnitData/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.count = response.data[0].count
        })
      },
      search () {
        this.loading = true
        if (this.startTime !== '') {
          this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        this.getCount()
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.dailyRepaymentUnitData
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    height: 4%
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666

  /*.el-col-4*/
    /*width: 15.66667%*/

  /*.el-col-20*/
    /*width: 84.33333%*/
  .userTable
    height: 74%
  .pagination
    padding-top :1.5%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
