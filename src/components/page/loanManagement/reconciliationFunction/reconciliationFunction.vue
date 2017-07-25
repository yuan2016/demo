<template>
  <div class="reconciliationFunction">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">订单号：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="out_trade_no"></el-input>
      <span class="managerFront">姓名：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">手机号：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <span class="managerFront">放款时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="userListTimeSelect"></el-date-picker>
      <span class="managerFront">用户类型：</span>
      <el-select v-model.trim="customer_type" size="small" placeholder="不限" class="loanAuditSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
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
      <el-table-column property="order_time" sortable label="下单时间"></el-table-column>
      <el-table-column property="loan_time" sortable label="放款时间"></el-table-column>
      <el-table-column property="child_type" label="子类型"></el-table-column>
      <el-table-column property="status" label="状态" width="120px"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="sizes"
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
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getData()
      },
      getData () {
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
          this.fundData = response.data
          this.loading = false
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
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666
    .managerText
      width: 180px
    .loanAuditButton
      margin-left: 5px
    .loanAuditSelect
      width: 90px

  .el-col-4
    width: 15.66667%

  .el-col-20
    width: 84.33333%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
