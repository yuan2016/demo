<template>
  <div class="repaymentMinutia">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">姓名：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="shortManagerText"
                v-model.trim="user_name"></el-input>
      <span class="managerFront">手机号：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <span class="managerFront">实际还款时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="minutiaTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="minutiaTimeSelect"></el-date-picker>
      <span class="managerFront">还款方式：</span>
      <el-select v-model.trim="repayment_channel" size="small" placeholder="不限" class="minutiaSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
      <el-button type="primary" size="small" class="userButton" :loading="buttonLoading">
        <a :href="mosaicLink" class="repaymentMinutiaExcel">导出excel</a>
      </el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto" :height="height">
      <el-table-column property="user_id" label="用户ID"></el-table-column>
      <el-table-column property="user_name" label="借款人姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="order_id" label="债权ID" width="160"></el-table-column>
      <el-table-column property="loan_id" label="还款ID" width="150"></el-table-column>
      <el-table-column property="loan_money" label="借款金额(元)"></el-table-column>
      <el-table-column property="repayment_amount" label="总应还款金额(元)" width="115"></el-table-column>
      <el-table-column property="repaymented_amount" label="已还金额(元)"></el-table-column>
      <el-table-column property="repayment_real_money" label="实还金额(元)"></el-table-column>
      <el-table-column property="return_money" label="退款金额(元)"></el-table-column>
      <el-table-column property="repayment_channel" label="还款方式" width="110"></el-table-column>
      <el-table-column property="repayment_detail" label="还款详情" width="110"></el-table-column>
      <el-table-column property="credit_repayment_time" sortable label="放款时间" width="130"></el-table-column>
      <el-table-column property="repayment_time" sortable label="应还款时间" width="130"></el-table-column>
      <el-table-column property="repayment_real_time" sortable label="实际还款时间" width="130"></el-table-column>
      <el-table-column property="late_day" label="逾期天数" width="60"></el-table-column>
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
  import banner from '../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'

  export default {
    data () {
      return {
        fundData: [],
        loading: false,
        buttonLoading: false,
        user_name: '',
        user_phone: '',
        repayment_channel: '',
        currentRow: null,
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '富友',
          label: '富友'
        }, {
          value: '连连',
          label: '连连'
        }, {
          value: '减免',
          label: '减免'
        }, {
          value: '支付宝',
          label: '支付宝'
        }, {
          value: '线下还款',
          label: '线下还款'
        }, {
          value: '益码通支付宝',
          label: '益码通支付宝'
        }, {
          value: '借款优惠服务费',
          label: '借款优惠服务费'
        }, {
          value: '连连代扣服务费',
          label: '连连代扣服务费'
        }, {
          value: '对公银行卡转账',
          label: '对公银行卡转账'
        }, {
          value: '连连主动还款',
          label: '连连主动还款'
        }, {
          value: '拉卡拉主动还款',
          label: '拉卡拉主动还款'
        }],
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        pageContent: 'sizes',
        height: 500
      }
    },
    computed: {
      mosaicLink () {
        let userName = this.user_name
        let userPhone = this.user_phone
        let repaymentChannel = this.repayment_channel
        let startTime = this.startTime || '1991-07-22'
        let endTime = this.endTime || getNowFormatDate()
        return 'api/repaymentMinutia/excel?user_name=' + userName + '&user_phone=' + userPhone + '&repayment_channel=' + repaymentChannel + '&startTime=' + startTime + '&endTime=' + endTime
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
        return this.axios.post('/api/repaymentMinutia', {
          user_name: this.user_name,
          user_phone: this.user_phone,
          repayment_channel: this.repayment_channel,
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/repaymentMinutia/count', {
          user_name: this.user_name,
          user_phone: this.user_phone,
          repayment_channel: this.repayment_channel,
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
  .repaymentMinutia
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
        width: 120px
      .shortManagerText
        width: 100px
      .loanAuditButton
        margin-left: 5px
      .minutiaSelect
        width: 120px
      .minutiaTimeSelect
        width: 140px
      .repaymentMinutiaExcel
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
