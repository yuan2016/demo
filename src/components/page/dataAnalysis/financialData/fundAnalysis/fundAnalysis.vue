<template>
  <div class="fundAnalysis">
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
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="d_date" sortable label="日期"></el-table-column>
      <el-table-column property="total_amount" label="当日应还总额(元)"></el-table-column>
      <el-table-column property="actual_repayment_amount" label="实际还款金额(元)"></el-table-column>
      <el-table-column property="repayment_ratio" label="还款比例"></el-table-column>
      <el-table-column property="renewal_amount" label="续期金额(元)"></el-table-column>
      <el-table-column property="renewal_commission" label="续期手续费收入(元)"></el-table-column>
      <el-table-column property="renewal_ratio" label="续期比例"></el-table-column>
      <el-table-column property="overdue_amount" label="逾期金额(元)"></el-table-column>
      <el-table-column property="overdue_proportion" label="逾期比例"></el-table-column>
      <el-table-column property="overdue_payment_amount" label="逾期还款金额(元)"></el-table-column>
      <el-table-column property="late_fees_income" label="滞纳金收入(元)"></el-table-column>
      <el-table-column property="comp_service_income" label="综合服务费收入(元)"></el-table-column>
      <el-table-column property="service_charge" label="实收服务费(元)"></el-table-column>
      <el-table-column property="equal_amount_income" label="同等金额收益(元)"></el-table-column>
      <el-table-column property="capital_surplus" label="当日资金盈余(元)"></el-table-column>
      <el-table-column property="create_time" sortable label="更新时间"></el-table-column>
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
        this.axios.post('/api/fundAnalysis', {
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
        this.axios.post('/api/fundAnalysis/count', {
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
  .date-filter
    padding: 15px 0 15px 1px
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666

  .el-col-4
    width: 15.66667%

  .el-col-20
    width: 84.33333%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
