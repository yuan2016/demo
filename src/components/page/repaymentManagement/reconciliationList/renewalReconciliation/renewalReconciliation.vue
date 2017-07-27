<template>
  <div class="renewalReconciliation">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
        <span class="managerFrontShort">订单号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="order_id"></el-input>
        <span class="managerFrontShort">续期方式：</span>
        <el-select v-model.trim="renewal_type" size="small" placeholder="不限" class="renewalSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <span class="managerFront">续期时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="renewalReconciliationTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="renewalReconciliationTimeSelect"></el-date-picker>
        <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData"
              highlight-current-row border stripe style="width: 100%;overflow: auto;" height="500">
      <el-table-column property="user_id" label="用户ID" width="80px"></el-table-column>
      <el-table-column property="realname" label="姓名" width="80px"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="asset_repayment_id" label="还款ID"></el-table-column>
      <el-table-column property="order_id" label="订单号" width="150px"></el-table-column>
      <el-table-column property="repayment_amount" label="总还款金额(元)" width="120px"></el-table-column>
      <el-table-column property="repaymented_amount" label="已还款金额(元)" width="120px"></el-table-column>
      <el-table-column property="repayment_interest" label="服务费(元)"></el-table-column>
      <el-table-column property="renewal_day" label="续期天数"></el-table-column>
      <el-table-column property="reback_count" label="续期费(元)"></el-table-column>
      <el-table-column property="return_money" label="退款金额(元)"></el-table-column>
      <el-table-column property="old_repayment_time" sortable label="续期前应还时间" width="130px"></el-table-column>
      <el-table-column property="repayment_time" sortable label="续期后应还时间" width="130px"></el-table-column>
      <el-table-column property="renewal_type" label="续期方式"></el-table-column>
      <el-table-column property="renewal_status" label="续期状态"></el-table-column>
      <el-table-column property="order_time" sortable label="续期时间" width="130"></el-table-column>
      <el-table-column property="lending_account" label="还款账户"></el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center;margin-top: 10px;">
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
        order_id: '',
        user_phone: '',
        renewal_type: '',
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
          label: '富有'
        }, {
          value: '2',
          label: '支付宝'
        }, {
          value: '3',
          label: '连连'
        }, {
          value: '4',
          label: '益码通支付宝'
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
        this.axios.post('/api/renewalReconciliation', {
          order_id: this.order_id,
          renewal_type: this.renewal_type,
          user_phone: this.user_phone,
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
  .renewalReconciliation
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
        width: 90px
        text-align:right
        font-size: 14px
        color: #666
      .managerFrontShort
        width:70px
      .managerText
        width: 135px
      .loanAuditButton
        margin-left: 5px
      .renewalSelect
        width: 130px
      .renewalReconciliationTimeSelect
        width: 255px


    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
