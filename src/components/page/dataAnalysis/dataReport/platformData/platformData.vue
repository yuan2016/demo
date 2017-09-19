<template>
  <div class="platformData" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }" >
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
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="platformData-table"
              style="width: 100%;overflow: auto" :height="height">
      <el-table-column property="d_date" fixed sortable label="日期"></el-table-column>
      <el-table-column property="register_num" label="注册人数" width="100px"></el-table-column>
      <el-table-column property="realname_auth_num" label="实名认证人数" width="100px"></el-table-column>
      <el-table-column property="realname_auth_freq" label="实名认证次数" width="100px"></el-table-column>
      <el-table-column property="realname_fee" label="实名费用(元)" width="100px"></el-table-column>
      <el-table-column property="operator_auth_num" label="运营商认证数" width="100px"></el-table-column>
      <el-table-column property="generate_report_num" label="生成报告人数" width="100px"></el-table-column>
      <el-table-column property="operator_fee" label="运营商费用(元)" width="100px"></el-table-column>
      <el-table-column property="card_bound_num" label="绑卡人数" width="100px"></el-table-column>
      <el-table-column property="Sesame_auth_num" label="芝麻认证人数" width="100px"></el-table-column>
      <el-table-column property="Sesame_auth_fee" label="芝麻认证费用(元)" width="100px"></el-table-column>
      <el-table-column property="auth_work_num" label="认证工作人数" width="100px"></el-table-column>
      <el-table-column property="Alipay_auth_num" label="支付宝认证人数" width="100px"></el-table-column>
      <el-table-column property="total_apply_loan_num" label="借款申请总数" width="100px"></el-table-column>
      <el-table-column property="total_audit_num" label="通过审核总数" width="100px"></el-table-column>
      <el-table-column property="Order_through_rate" label="订单通过率" width="100px"></el-table-column>
      <el-table-column property="total_payloans_amount" label="应放款总额(元)" width="100px"></el-table-column>
      <el-table-column property="total_succloan_amount" label="放款成功总额(元)" width="100px"></el-table-column>
      <el-table-column property="succ_loan_num" label="放款成功笔数" width="100px"></el-table-column>
      <el-table-column property="outstand_num" label="未到账笔数"></el-table-column>
      <el-table-column property="total_failsingular_num" label="打款失败总订单数" width="110px"></el-table-column>
      <el-table-column property="total_passuser_num" label="通过用户总数" width="100px"></el-table-column>
      <el-table-column property="passuser_rate" label="用户通过率" width="100px"></el-table-column>
      <el-table-column property="counter_fraud_num" label="反欺诈人数" width="100px"></el-table-column>
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
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        pageContent: 'sizes',
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
        return this.axios.post('/api/platformData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/platformData/count', {
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
        this.axios.post('/api/platformData/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '平台数据刷新完毕，请查看',
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
              this.$message.error('平台数据一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('平台数据一键刷新出现错误，请检查网络或联系管理员')
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
  .platformData
    height: 100%
    .platformData-table
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

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
