<template>
  <div class="daysStageStatistics">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">到期日：</span>
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
    <el-table v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 99%;overflow: auto;">
      <el-table-column property="d_date" label="到期日" stripe sortable width="130px"></el-table-column>
      <el-table-column property="loan_date_f1" label="F1放款日" sortable width="130px"></el-table-column>
      <el-table-column property="due_amount_f1" label="F1到期金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_amount_f1" label="F1还款金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_rate_f1" label="F1还款率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_f1" label="F1逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f1" label="F1老用户逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f1" label="F1老用户逾期率" width="130px"></el-table-column>
      <el-table-column property="loan_date_f2" sortable label="F2放款日" width="130px"></el-table-column>
      <el-table-column property="due_amount_f2" label="F2到期金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_amount_f2" label="F2还款金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_rate_f2" label="F2还款率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_f2" label="F2逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f2" label="F2老用户逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f2" label="F2新用户逾期率" width="130px"></el-table-column>
      <el-table-column property="loan_date_f3" sortable label="F3放款日" width="130px"></el-table-column>
      <el-table-column property="due_amount_f3" label="F3到期金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_amount_f3" label="F3还款金额(元)" width="130px"></el-table-column>
      <el-table-column property="repayment_rate_f3" label="F3还款率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_f3" label="F3逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f3" label="F3老用户逾期率" width="130px"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f3" label="F3新用户逾期率" width="130px"></el-table-column>
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
        this.axios.post('/api/daysStageStatistics21', {
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
        this.axios.post('/api/daysStageStatistics21/count', {
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
.daysStageStatistics
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    height: 4%
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666

    /*.el-col-4*/
      /*width: 10.66667%*/
    /*.el-col-20*/
      /*width: 89.33333%*/
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
