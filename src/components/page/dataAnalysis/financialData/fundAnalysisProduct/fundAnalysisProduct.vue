<template>
  <div class="fundAnalysisProduct" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">日期：</span>
      <el-date-picker
        size="small"
        v-model.trim="startTime"
        type="date"
        placeholder="从">
      </el-date-picker>
      <el-date-picker
        size="small"
        v-model.trim="endTime"
        type="date"
        placeholder="到">
      </el-date-picker>
      <el-button type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
      <el-button type="primary" size="small" :loading="buttonLoading" @click.prevent.stop="refreshData">一键刷新</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto" :height="height">
      <el-table-column property="D_DATE" sortable fixed label="日期"></el-table-column>
      <el-table-column label="当日应还总额(元)">
      <el-table-column property="TOTAL_AMOUNT_14" label="14天"width="100"></el-table-column>
      <el-table-column property="TOTAL_AMOUNT_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="TOTAL_AMOUNT_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="实际还款金额(元)">
      <el-table-column property="ACTUAL_REPAYMENT_AMOUNT_14" label="14天"width="100"></el-table-column>
      <el-table-column property="ACTUAL_REPAYMENT_AMOUNT_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="ACTUAL_REPAYMENT_AMOUNT_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="还款比例">
      <el-table-column property="REPAYMENT_RATIO_14" label="14天"width="100"></el-table-column>
      <el-table-column property="REPAYMENT_RATIO_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="REPAYMENT_RATIO_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column property="RENEWAL_AMOUNT_14" label="续期金额-14天(元)"width="120"></el-table-column>
      <el-table-column property="RENEWAL_COMMISSION_14" label="续期手续费收入-14天(元)"width="150"></el-table-column>
      <el-table-column property="RENEWAL_RATIO_14" label="续期比例-14天"width="110"></el-table-column>
      <el-table-column label="逾期金额(元)">
      <el-table-column property="OVERDUE_AMOUNT_14" label="14天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_AMOUNT_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_AMOUNT_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="逾期比例">
      <el-table-column property="OVERDUE_PROPORTION_14" label="14天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_PROPORTION_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_PROPORTION_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="逾期还款金额(元)">
      <el-table-column property="OVERDUE_PAYMENT_AMOUNT_14" label="14天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_PAYMENT_AMOUNT_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="OVERDUE_PAYMENT_AMOUNT_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="滞纳金收入(元)">
      <el-table-column property="LATE_FEES_INCOME_14" label="14天"width="100"></el-table-column>
      <el-table-column property="LATE_FEES_INCOME_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="LATE_FEES_INCOME_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="综合服务费收入(元)">
      <el-table-column property="COMP_SERVICE_INCOME_14" label="14天"width="100"></el-table-column>
      <el-table-column property="COMP_SERVICE_INCOME_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="COMP_SERVICE_INCOME_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="实收服务费(元)">
      <el-table-column property="SERVICE_CHARGE_14" label="14天"width="100"></el-table-column>
      <el-table-column property="SERVICE_CHARGE_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="SERVICE_CHARGE_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="同等金额收益(元)">
      <el-table-column property="EQUAL_AMOUNT_INCOME_14" label="14天"width="100"></el-table-column>
      <el-table-column property="EQUAL_AMOUNT_INCOME_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="EQUAL_AMOUNT_INCOME_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column label="当日资金盈余(元)">
      <el-table-column property="CAPITAL_SURPLUS_14" label="14天"width="100"></el-table-column>
      <el-table-column property="CAPITAL_SURPLUS_21F" label="21天"width="100"></el-table-column>
      <el-table-column property="CAPITAL_SURPLUS_90F" label="90天"width="100"></el-table-column>
      </el-table-column>
      <el-table-column property="UPDATE_TIME" sortable label="更新时间" width="130"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        :layout="pageContent"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../../common/js/utils'
  import { getHeight } from '../../../../../common/js/storage'

  export default {
    data () {
      return {
        fundData: [],
        loading: false,
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        height: 500,
        buttonLoading: false
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
      this.height = getHeight()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getDataInit()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getDataInit()
      },
      getDataInit () {
        this.axios.all([this.getCount(), this.getData()])
          .then(this.axios.spread((acct, perms) => {
            if (perms.data.code === '404' || acct.data.code === '404') {
              this.$router.push('./404')
            } else if (perms.data.code === '1024' || acct.data.code === '1024') {
              this.fundData = []
              this.loading = false
              this.$message({
                message: '请求超时，请增加搜索条件以便搜索',
                type: 'warning'
              })
            } else {
              this.count = acct.data[0].count
              this.fundData = perms.data
              this.loading = false
              this.pageContent = 'total, sizes, prev, pager, next, jumper'
            }
          })).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData () {
        return this.axios.post('/api/fundAnalysisProduct', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/fundAnalysisProduct/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
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
        this.getDataInit()
      },
      refreshData () {
        this.buttonLoading = true
        this.axios.post('/api/fundAnalysisProduct/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '资金分析(产品)刷新完毕，请查看',
              type: 'success'
            })
          } else if (response.data.code === '400') {
            this.buttonLoading = false
            this.$message({
              message: '已经有用户在尝试刷新，请稍后刷新页面即可',
              type: 'warning'
            })
          } else {
            setTimeout(() => {
              this.buttonLoading = false
              this.$message.error('资金分析(分产品)一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('资金分析(分产品)一键刷新出现错误，请检查网络或联系管理员')
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fundAnalysisProduct
  height :100%
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    height 60px
    .managerFront
      padding-left :5px
      font-size: 14px
      color: #666


  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
