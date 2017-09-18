<template>
  <div class="dailyRepaymentAmountData" v-loading.body="loading" element-loading-text="拼命加载中">
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
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto;" :height="height" class="dailyRepaymentAmountData-table">
      <el-table-column property="d_date" fixed sortable label="日期" width="90"></el-table-column>
      <el-table-column property="mature_money" label="到期金额(元)" width="100"></el-table-column>
      <el-table-column property="overdue_money" label="逾期金额(元)" width="100"></el-table-column>
      <el-table-column property="overdue_rate" label="逾期率" width="80"></el-table-column>
      <el-table-column property="repayment_rate" label="还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_7day" label="7天期限逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_14day" label="14天期限逾期率" width="110"></el-table-column>
      <el-table-column property="overdue_rate_21day" label="21天期限逾期率" width="110"></el-table-column>
      <el-table-column property="mature_money_ouser" label="老用户到期金额(元)" width="130"></el-table-column>
      <el-table-column property="overdue_money_ouser" label="老用户逾期金额(元)" width="130"></el-table-column>
      <el-table-column property="overdue_rate_ouser" label="老用户逾期率" width="100"></el-table-column>
      <el-table-column property="repayment_rate_ouser" label="老用户还款率" width="100"></el-table-column>
      <el-table-column property="mature_money_nuser" label="新用户到期金额(元)" width="120"></el-table-column>
      <el-table-column property="overdue_money_nuser" label="新用户逾期金额(元)" width="120"></el-table-column>
      <el-table-column property="overdue_rate_nuser" label="新用户逾期率"></el-table-column>
      <el-table-column property="repayment_rate_nuser" label="新用户还款率"></el-table-column>
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
        currentRow: null,
        pageContent: 'sizes',
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
      this.height = parseInt(getHeight()) + 40
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
        return this.axios.post('/api/dailyRepaymentAmountData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/dailyRepaymentAmountData/count', {
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
        this.axios.post('/api/dailyRepaymentAmountData/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '每日还款金额数据刷新完毕，请查看',
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
              this.$message.error('每日还款金额数据一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('每日还款金额数据一键刷新出现错误，请检查网络或联系管理员')
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.dailyRepaymentAmountData
  height:100%
  .dailyRepaymentAmountData-table
    border-radius :10px
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
