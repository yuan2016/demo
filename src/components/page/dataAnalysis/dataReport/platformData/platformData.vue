<template>
  <div class="platformData">
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
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe
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
        height: 700
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
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
          this.$message.error('搜索出现错误，请重试')
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .platformData
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
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
