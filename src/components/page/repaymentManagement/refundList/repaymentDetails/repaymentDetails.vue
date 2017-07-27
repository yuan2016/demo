<template>
  <div class="repaymentDetails">
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
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData"
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
      <el-table-column property="repayment_time" sortable label="到期时间"width="130px"></el-table-column>
      <el-table-column property="repayment_type" label="还款方式"></el-table-column>
      <el-table-column property="repayment_real_time" sortable label="还款时间"width="130px"></el-table-column>
      <el-table-column property="order_time" sortable label="订单还款时间" width="130px"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '1',
          label: '支付宝'
        }, {
          value: '2',
          label: '银行卡主动还款'
        }, {
          value: '3',
          label: '银行卡自动扣款'
        }, {
          value: '4',
          label: '对公银行卡转账'
        }
        ]
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
        this.axios.post('/api/repaymentDetails', {
          user_phone: this.user_phone,
          repayment_type: this.repayment_type,
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
.repaymentDetails
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    height 60px
    .managerFront
      padding-left :5px
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
