<template>
  <div class="promotionChannelStatistics">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">渠道商：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_trader"></el-input>
      <span class="managerFront">渠道商名称：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_trader_name"></el-input>
      <span class="managerFront">日期：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从" class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到" class="userListTimeSelect"></el-date-picker>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="channel_trader" label="渠道商"></el-table-column>
      <el-table-column property="channel_trader_name" label="渠道商名称"></el-table-column>
      <el-table-column property="d_date" sortable label="日期"></el-table-column>
      <el-table-column property="settle_method" label="结算方式" width="170px"></el-table-column>
      <el-table-column property="effe_cust_acqu_cost" label="有效获客成本(元)" width="100px"></el-table-column>
      <el-table-column property="day_consumption" label="当日消耗(元)"></el-table-column>
      <el-table-column property="register_num" label="注册量"></el-table-column>
      <el-table-column property="all_fact_auth_num" label="全要素认证人数" width="100px"></el-table-column>
      <el-table-column property="apply_loan_num" label="申请借款人数" width="100px"></el-table-column>
      <el-table-column property="blacklist_num" label="黑名单人数"></el-table-column>
      <el-table-column property="entries_num" label="进件数"></el-table-column>
      <el-table-column property="nuser_apply_succ_num" label="新用户申请成功人数" width="130px"></el-table-column>
      <el-table-column property="ouser_apply_succ_num" label="老用户申请成功人数" width="130px"></el-table-column>
      <el-table-column property="nuser_loan_ratio" label="新用户借款率" width="100px"></el-table-column>
      <el-table-column property="nuser_adoption_rate" label="新用户通过率" width="100px"></el-table-column>
      <el-table-column property="nuser_loan_amount" label="新用户放款金额(元)" width="120px"></el-table-column>
      <el-table-column property="ouser_adoption_rate" label="老用户通过率"></el-table-column>
      <el-table-column property="ouser_loan_amount" label="老用户放款金额(元)" width="120px"></el-table-column>
      <el-table-column property="overdue_num" label="逾期人数"></el-table-column>
      <el-table-column property="create_time" sortable label="更新时间"></el-table-column>
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
        channel_trader: '',
        channel_trader_name: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: ''
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
        this.axios.post('/api/promotionChannelStatistics', {
          channel_trader: this.channel_trader,
          channel_trader_name: this.channel_trader_name,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      getCount () {
        this.axios.post('/api/promotionChannelStatistics/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.count = response.data[0].count
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
    .userButton
      margin-left: 5px
    .userListTimeSelect
      width: 120px
    .userListSelect
      width: 80px

  .el-col-4
    width: 10.66667%

  .el-col-20
    width: 89.33333%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
