<template>
  <div class="channelStatisticsSummary" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">渠道商：</span>
      <el-select v-model.trim="channel_trader" filterable clearable size="small" placeholder="不限"
                 class="promoterSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData"
              highlight-current-row border stripe style="width: 100%;overflow: auto;" :height="height">
      <el-table-column property="channel_trader" label="渠道商"></el-table-column>
      <el-table-column property="register_num" label="注册量"></el-table-column>
      <el-table-column property="realname_auth_num" sortable label="实名认证"></el-table-column>
      <el-table-column property="card_bound_num" label="绑卡人数"></el-table-column>
      <el-table-column property="emergency_contact_num" label="紧急联系人"></el-table-column>
      <el-table-column property="operator_auth_num" label="运营商认证"></el-table-column>
      <el-table-column property="Alipay_auth_num" label="支付宝认证人数" width="100px"></el-table-column>
      <el-table-column property="Sesame_auth_num" label="芝麻认证人数" width="100px"></el-table-column>
      <el-table-column property="jobinfo_auth_num" label="工作信息"></el-table-column>
      <el-table-column property="blacklist_num" label="黑名单人数"></el-table-column>
      <el-table-column property="apply_loan_num" label="申请借款人数"></el-table-column>
      <el-table-column property="apply_succ_num" label="申请成功人数"></el-table-column>
      <el-table-column property="Pass_rate" label="通过率"></el-table-column>
      <el-table-column property="loan_amount" label="放款金额(元)"></el-table-column>
      <el-table-column property="overdue_num" label="逾期人数"></el-table-column>
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
  import { getHeight } from '../../../../common/js/storage'

  export default {
    data () {
      return {
        channel_trader: '',
        fundData: [],
        loading: false,
        currentRow: null,
        pageContent: 'sizes',
        options: [],
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        height: 500
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getSelectOptions()
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
        return this.axios.post('/api/channelStatisticsSummary', {
          channel_trader: this.channel_trader,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/channelStatisticsSummary/count', {
          channel_trader: this.channel_trader
        })
      },
      getSelectOptions () {
        this.axios.post('/api/channelStatisticsSummary/getSelectOptions').then((response) => {
          this.options = response.data
        })
      },
      search () {
        this.loading = true
        this.getDataInit()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .channelStatisticsSummary
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
      .userButton
        margin-left: 5px
      .promoterSelect
        width: 180px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
