<template>
  <div class="overdueRepaymentStatistics" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
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
      </li>
     <li>
       <el-button type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
       <el-button type="primary" size="small" :loading="buttonLoading" @click.prevent.stop="refreshData">一键刷新</el-button>
       <el-button type="primary" size="small" class="userButton">
         <a :href="mosaicLink" class="overdueRepaymentStatisticsExcel">导出excel</a>
       </el-button>
     </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="overdueRepaymentStatistics-table"
              style="width: 100%;overflow: auto;" :height="height">
      <el-table-column property="d_date" sortable label="日期" width="80"></el-table-column>
      <el-table-column property="loan_amount_total" label="当前借款总数量" width="110"></el-table-column>
      <el-table-column property="loan_money_total" label="当前借款总额(元)" width="110"></el-table-column>
      <el-table-column property="repayment_amount_total" label="已经还款总数量" width="110"></el-table-column>
      <el-table-column property="repayment_money_total" label="已经还款总额(元)" width="110"></el-table-column>
      <el-table-column property="quantity_overdue" label="逾期中数量"width="90"></el-table-column>
      <el-table-column property="total_overdue" label="逾期中总额(元)"width="100"></el-table-column>
      <el-table-column property="m_overdue_rate_s1" label="S1级逾期率(按金额)"></el-table-column>
      <el-table-column property="m_overdue_rate_s2" label="S2级逾期率(按金额)"></el-table-column>
      <el-table-column property="m_overdue_rate_s3" label="S3级逾期率(按金额)"></el-table-column>
      <el-table-column property="m_overdue_rate_m3" label="M3级逾期率(按金额)"></el-table-column>
      <el-table-column property="n_overdue_rate_s1" label="S1级逾期率(按单数)"></el-table-column>
      <el-table-column property="n_overdue_rate_s2" label="S2级逾期率(按单数)"></el-table-column>
      <el-table-column property="n_overdue_rate_s3" label="S3级逾期率(按单数)"></el-table-column>
      <el-table-column property="n_overdue_rate_m3" label="M3级逾期率(按单数)"></el-table-column>
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
        dHeight: 500
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
    computed: {
      mosaicLink () {
        let startTime = this.startTime || '1991-07-22'
        let endTime = this.endTime || getNowFormatDate()
        return 'api/overdueRepaymentStatistics/excel?startTime=' + startTime + '&endTime=' + endTime
      }
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
        return this.axios.post('/api/overdueRepaymentStatistics', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/overdueRepaymentStatistics/count', {
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
        this.axios.post('/api/overdueRepaymentStatistics/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '还款逾期统计刷新完毕，请查看',
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
              this.$message.error('还款逾期统计一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('还款逾期统计一键刷新出现错误，请检查网络或联系管理员')
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .overdueRepaymentStatistics
    height: 100%
    .overdueRepaymentStatistics-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        margin-right: 20px
        .managerFront
          padding-left: 5px
          font-size: 14px
          color: #666
        .overdueRepaymentStatisticsExcel
          color :#ffffff

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
