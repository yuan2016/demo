<template>
  <div class="daysStageStatistics90" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">到期日：</span>
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
      </li>
      <li>
        <el-button class="userButton" type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
        <el-button class="userButtonSpecial" type="primary" size="small" :loading="buttonLoading" @click.prevent.stop="refreshData">一键刷新</el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="daysStageStatistics90-table"
              style="width: 100%;overflow: auto;" :height="height" @sort-change="sort">
      <el-table-column property="d_date" label="到期日" fixed sortable="custom" width="100"></el-table-column>
      <el-table-column property="loan_date_f1" label="F1放款日" sortable="custom" width="100"></el-table-column>
      <el-table-column property="due_amount_f1" label="F1到期金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_amount_f1" label="F1还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f1" label="F1还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f1" label="F1逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f1" label="F1老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f1" label="F1新用户逾期率" width="100"></el-table-column>
      <el-table-column property="loan_date_f2" sortable="custom" label="F2放款日" width="100"></el-table-column>
      <el-table-column property="due_amount_f2" label="F2到期金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_amount_f2" label="F2还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f2" label="F2还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f2" label="F2逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f2" label="F2老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f2" label="F2新用户逾期率" width="100"></el-table-column>
      <el-table-column property="loan_date_f3" sortable="custom" label="F3放款日" width="100"></el-table-column>
      <el-table-column property="due_amount_f3" label="F3到期金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_amount_f3" label="F3还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f3" label="F3还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f3" label="F3逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f3" label="F3老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f3" label="F3新用户逾期率" width="100"></el-table-column>
      <el-table-column property="loan_date_f4" label="F4放款日" sortable="custom" width="100"></el-table-column>
      <el-table-column property="due_amount_f4" label="F4到期金额(元)"  width="100"></el-table-column>
      <el-table-column property="repayment_amount_f4" label="F4还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f4" label="F4还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f4" label="F4逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f4" label="F4老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f4" label="F4新用户逾期率" width="100"></el-table-column>
      <el-table-column property="loan_date_f5" label="F5放款日" sortable="custom" width="100"></el-table-column>
      <el-table-column property="due_amount_f5" label="F5到期金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_amount_f5" label="F5还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f5" label="F5还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f5" label="F5逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f5" label="F5老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f5" label="F5新用户逾期率" width="100"></el-table-column>
      <el-table-column property="loan_date_f6" label="F6放款日" sortable="custom" width="100"></el-table-column>
      <el-table-column property="due_amount_f6" label="F6到期金额" width="100"></el-table-column>
      <el-table-column property="repayment_amount_f6" label="F6还款金额(元)" width="100"></el-table-column>
      <el-table-column property="repayment_rate_f6" label="F6还款率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_f6" label="F6逾期率" width="80"></el-table-column>
      <el-table-column property="overdue_rate_ouser_f6" label="F6老用户逾期率" width="100"></el-table-column>
      <el-table-column property="overdue_rate_nuser_f6" label="F6新用户逾期率" width="100"></el-table-column>
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
        buttonLoading: false,
        dHeight: 500,
        order: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
    },
    mounted () {
      this.resizeHeight()
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
        return this.axios.post('/api/daysStageStatistics90', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime,
          endTime: this.endTime,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/daysStageStatistics90/count', {
          startTime: this.startTime,
          endTime: this.endTime
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
        this.axios.post('/api/daysStageStatistics90/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '90天分期统计刷新完毕，请查看',
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
              this.$message.error('90天分期一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('90天分期一键刷新出现错误，请检查网络或联系管理员')
        })
      },
      resizeHeight () {
        this.setHeight()
        window.onresize = this.setHeight
      },
      setHeight () {
        let docH = document.documentElement.clientHeight
        let banner = document.getElementsByClassName('banner')[0]
        let bannerH = 0
        let filter = document.getElementsByClassName('date-filter')[0]
        let filterH = 0
        let page = document.getElementsByClassName('el-pagination')[0]
        let pageH = 0
        if (banner) {
          bannerH = banner.offsetHeight
        }
        if (filter) {
          filterH = filter.clientHeight
        }
        if (page) {
          if (page.offsetHeight !== 0) {
            pageH = page.offsetHeight
          } else {
            pageH = 32
          }
        } else {
          pageH = 60
        }
        this.height = docH - filterH - bannerH - pageH - 85 /*90+20*/
        this.dHeight = docH - 90
      },
      sort (info) {
        if (info.order === 'ascending') {
          this.order = ' order by ' + info.prop + ' asc'
        } else if (info.order === 'descending') {
          this.order = ' order by ' + info.prop + ' desc'
        } else {
          this.order = ''
        }
        this.search(this.order)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .daysStageStatistics90
    height: 100%
    .daysStageStatistics90-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        .managerFront
          padding-left: 5px
          font-size: 14px
          color: #666
        .userButtonSpecial
          margin-left :5px
        .userButton
          margin-left :10px


    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
