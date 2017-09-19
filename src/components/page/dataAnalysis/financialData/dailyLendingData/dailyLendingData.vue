<template>
  <div class="dailyLendingData" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
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
          <a :href="mosaicLink" class="dailyLendingDataExcel">导出excel</a>
        </el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto;" :height="height" class="dailyLendingData-table">
      <el-table-column property="d_date" fixed sortable label="日期" sortable></el-table-column>
      <el-table-column property="register_num" label="注册人数"></el-table-column>
      <el-table-column property="loan_num" label="借款人数"></el-table-column>
      <el-table-column property="success_loan_num" label="成功借款人数"width="100"></el-table-column>
      <el-table-column property="newuser_loan_rate" label="新用户借款占比"width="100"></el-table-column>
      <el-table-column property="olduser_loan_rate" label="老用户借款占比"width="100"></el-table-column>
      <el-table-column property="accunewuser_loan_rate" label="累计新用户借款占比" width="125"></el-table-column>
      <el-table-column property="accuolduser_loan_rate" label="累计老用户借款占比" width="125"></el-table-column>
      <el-table-column property="loan_singular" label="放款单数"width="70"></el-table-column>
      <el-table-column property="loan_singular_7day" label="7天期限放款单数" width="110"></el-table-column>
      <el-table-column property="loan_singular_14day" label="14天期限放款单数" width="110"></el-table-column>
      <el-table-column property="loan_singular_21day" label="21天期限放款单数" width="110"></el-table-column>
      <el-table-column property="loan_singular_f_21day" label="21天分期放款单数" width="110"></el-table-column>
      <el-table-column property="loan_singular_90day" label="90天分期放款单数" width="110"></el-table-column>
      <el-table-column property="loan_singular_t_21day" label="21天分期提额放款单数" width="130"></el-table-column>
      <el-table-column property="loans_total" label="放款总额(元)"width="110"></el-table-column>
      <el-table-column property="loans_total_7day" label="7天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_14day" label="14天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_21day" label="21天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_f_21day" label="21天分期放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_90day" label="90天分期放款金额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_t_21day" label="21天分期提额放款金额(元)" width="150px"></el-table-column>
      <el-table-column property="loan_singular_ouser" label="老用户放款单数" width="110"></el-table-column>
      <el-table-column property="loans_total_ouser" label="老用户放款总额(元)" width="120"></el-table-column>
      <el-table-column property="loan_singular_nuser" label="新用户放款单数" width="110"></el-table-column>
      <el-table-column property="loans_total_nuser" label="新用户放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="CHARGEBACK_FAILRATE" label="扣款失败率"></el-table-column>
      <el-table-column property="create_time" label="更新时间" width="130px"></el-table-column>
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
        return 'api/dailyLendingData/excel?startTime=' + startTime + '&endTime=' + endTime
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
        return this.axios.post('/api/dailyLendingData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/dailyLendingData/count', {
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
        this.axios.post('/api/dailyLendingData/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '数据刷新完毕，请查看',
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
              this.$message.error('一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('一键刷新出现错误，请检查网络或联系管理员')
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
  .dailyLendingData
    height: 100%
    .dailyLendingData-table
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
        .dailyLendingDataExcel
          color: #fff

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>

