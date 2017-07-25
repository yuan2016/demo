<template>
  <div class="waitingForReturnList">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">姓名：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">手机号：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <span class="managerFront">状态：</span>
      <el-select v-model.trim="status" size="small" disabled placeholder="已放款/待还款" class="watingSelect">
      </el-select>
      <el-button type="primary" size="small" class="watingButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="repayment_principal" label="借款到账金额(元)"></el-table-column>
      <el-table-column property="repayment_interest" label="服务费(元)"></el-table-column>
      <el-table-column property="repayment_amount" label="需还款总金额(元)"></el-table-column>
      <el-table-column property="repaymented_amount" label="已还金额(元)"></el-table-column>
      <el-table-column property="credit_repayment_time" sortable label="放款时间"></el-table-column>
      <el-table-column property="repayment_time" sortable label="到期日期"></el-table-column>
      <el-table-column property="late_day" label="逾期天数"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="is_fenqi" label="是否分期"></el-table-column>
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
  import banner from '../../../../common/banner/banner'
  export default {
    data () {
      return {
        status: '已放款/待还款',
        realname: '',
        user_phone: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
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
        this.axios.post('/api/waitingForReturnList', {
          realname: this.realname,
          user_phone: this.user_phone,
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      /*getCount () {
       this.axios.post('/api/raiseQuotaRecord/count', {
       id: this.id,
       realname: this.realname,
       id_number: this.id_number
       }).then((response) => {
       this.count = response.data[0].count
       })
       },*/
      search () {
        this.loading = true
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px
    .managerFront
      padding-left :5px
      font-size: 14px
      color: #666
    .managerText
      width: 180px
    /*&:before*/
    /*position: absolute*/
    /*right: 10px*/
    /*top: 8px*/
    /*content: "X"*/
    /*font-size: 16px*/
    /*color: #ccc*/
    .watingButton
      margin-left: 5px
    .watingSelect
      width: 130px

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
