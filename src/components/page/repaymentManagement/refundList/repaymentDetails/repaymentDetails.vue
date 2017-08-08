<template>
  <div class="repaymentDetails" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">手机号：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <span class="managerFront">还款时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="userListTimeSelect"></el-date-picker>
      <span class="managerFront">还款方式：</span>
      <el-select v-model.trim="repayment_type" size="small" placeholder="不限" class="repaySelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData"
              highlight-current-row border stripe style="width: 100%;overflow: auto;" height="500">
      <el-table-column property="id" label="详情ID"></el-table-column>
      <el-table-column property="order_id" label="订单号" width="150px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="repayment_principal" label="借款到账金额(元)" width="120px"></el-table-column>
      <el-table-column property="repayment_interest" label="服务费(元)"></el-table-column>
      <el-table-column property="repayment_amount" label="总还款金额(元)" width="120px"></el-table-column>
      <el-table-column property="repaymented_amount" label="已还款金额(元)" width="120px"></el-table-column>
      <el-table-column property="true_repayment_money" label="实还金额(元)"></el-table-column>
      <el-table-column property="credit_repayment_time" sortable label="放款时间" width="130px"></el-table-column>
      <el-table-column property="repayment_time" sortable label="到期时间" width="130px"></el-table-column>
      <el-table-column property="repayment_type" label="还款方式"></el-table-column>
      <el-table-column property="repayment_real_time" sortable label="还款时间" width="130px"></el-table-column>
      <el-table-column property="order_time" sortable label="订单还款时间" width="130px"></el-table-column>
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
        user_phone: '',
        repayment_type: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        isShowPage: false,
        pageContent: 'sizes',
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '1',
          label: '支付宝'
        }, {
          value: '2',
          label: '富友'
        }, {
          value: '3',
          label: '连连'
        }, {
          value: '4',
          label: '连连代扣服务费'
        }, {
          value: '5',
          label: '对公银行卡转账'
        }, {
          value: '6',
          label: '减免'
        }, {
          value: '7',
          label: '线下还款'
        }, {
          value: '8',
          label: '益码通支付宝'
        }, {
          value: '9',
          label: '借款优惠服务费'
        }]
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
        this.axios.post('/api/repaymentDetails', {
          user_phone: this.user_phone,
          repayment_type: this.repayment_type,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.loading = false
            this.$message({
              message: '请求超时，请增加搜索条件以便搜索',
              type: 'warning'
            })
          } else {
            this.fundData = response.data
            this.loading = false
          }
        }).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message.error('搜索出现错误，请重试')
        })
      },
      getData () {
        return this.axios.post('/api/repaymentDetails', {
          user_phone: this.user_phone,
          repayment_type: this.repayment_type,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/repaymentDetails/count', {
          user_phone: this.user_phone,
          repayment_type: this.repayment_type,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.user_phone === '' && this.repayment_type === '' && this.startTime === '' && this.endTime === '') {
          console.log(false)
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
          if (this.startTime !== '') {
            this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
          }
          if (this.endTime !== '') {
            this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
          }
          console.log(true)
          this.isShowPage = true
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
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .repaymentDetails
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
        font-size: 14px
        color: #666
      .managerText
        width: 180px
      .loanAuditButton
        margin-left: 5px
      .repaySelect
        width: 140px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
