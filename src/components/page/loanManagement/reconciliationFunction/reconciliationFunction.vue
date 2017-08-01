<template>
  <div class="reconciliationFunction" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">订单号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText"
                  v-model.trim="out_trade_no"></el-input>
        <span class="managerFrontShort">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerTextShort" v-model.trim="realname"></el-input>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      </li>
      <li>
        <span class="managerFront">放款时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="reconciliationTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="reconciliationTimeSelect"></el-date-picker>
        <span class="managerFront">用户类型：</span>
        <el-select v-model.trim="customer_type" size="small" placeholder="不限" class="reconciliationSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table :data="fundData"
              highlight-current-row border stripe style="width: 100%;overflow: auto" height="500">
      <el-table-column property="out_trade_no" label="订单号" width="150px"></el-table-column>
      <el-table-column property="yurref" label="打款订单号" width="170px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="money_amount" label="借款金额(元)"></el-table-column>
      <el-table-column property="into_money" label="到账金额(元)"></el-table-column>
      <el-table-column property="loan_term" label="天数"></el-table-column>
      <el-table-column property="loan_interests" label="服务费(元)"></el-table-column>
      <el-table-column property="sjloan_urgent_fee" label="加急费(元)"></el-table-column>
      <el-table-column property="apr" label="服务费利率(万分之一)" width="150px"></el-table-column>
      <el-table-column property="is_fenqi" label="是否分期"></el-table-column>
      <el-table-column property="order_time" sortable label="下单时间"width="130px"></el-table-column>
      <el-table-column property="loan_time" sortable label="放款时间"width="130px"></el-table-column>
      <el-table-column property="child_type" label="子类型"></el-table-column>
      <el-table-column property="pay_remark" label="状态" width="120px"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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
  import banner from '../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'

  export default {
    data () {
      return {
        out_trade_no: '',
        realname: '',
        user_phone: '',
        customer_type: '',
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
        status: '放款中',
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '新用户'
        }, {
          value: '1',
          label: '老用户'
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
        this.axios.post('/api/reconciliationFunction', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          customer_type: this.customer_type,
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
        return this.axios.post('/api/reconciliationFunction', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          customer_type: this.customer_type,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/reconciliationFunction/count', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          customer_type: this.customer_type,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.out_trade_no === '' && this.realname === '' && this.customer_type === '' && this.user_phone === '' && this.startTime === '' && this.endTime === '') {
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
  .reconciliationFunction
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 90px
      li
        margin-bottom :5px
      .managerFront,.managerFrontShort
        display: inline-block
        padding-left: 5px
        width: 70px
        text-align:right
        font-size: 14px
        color: #666
      .managerFrontShort
        width: 50px
      .managerText
        width: 180px
      .managerTextShort
        width :100px
      .loanAuditButton
        margin-left: 5px
      .reconciliationSelect
        width: 126px
      .reconciliationTimeSelect
        width: 170px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
