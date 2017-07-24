<template>
  <div class="promotionRegionStatistics">
    <banner></banner>
    <div class="date-filter">
      <div class="selectContent">
        <select-city @selectCity="getSelectCity" @selectProvince="getSelectProvince"></select-city>
      </div>
      <span class="managerFront">日期：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="userListTimeSelect"></el-date-picker>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="d_date" sortable label="日期"></el-table-column>
      <el-table-column property="Province" label="省份"></el-table-column>
      <el-table-column property="city" label="城市"></el-table-column>
      <el-table-column property="register_num" label="注册量"></el-table-column>
      <el-table-column property="realname_auth_num" label="实名认证"></el-table-column>
      <el-table-column property="card_bound_num" label="绑卡人数"></el-table-column>
      <el-table-column property="emergency_contact_num" label="紧急联系人"></el-table-column>
      <el-table-column property="operator_auth_num" label="运营商认证"></el-table-column>
      <el-table-column property="Alipay_auth_num" label="支付宝认证人数"></el-table-column>
      <el-table-column property="Sesame_auth_num" label="芝麻认证人数"></el-table-column>
      <el-table-column property="jobinfo_auth_num" label="工作信息"></el-table-column>
      <el-table-column property="apply_loan_num" label="申请借款人数"></el-table-column>
      <el-table-column property="apply_succ_num" label="申请成功人数"></el-table-column>
      <el-table-column property="Pass_rate" label="通过率"></el-table-column>
      <el-table-column property="loan_amount" label="放款金额(元)"></el-table-column>
      <el-table-column property="blacklist_num" label="黑名单人数"></el-table-column>
      <el-table-column property="overdue_num" label="逾期人数"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  import selectCity from '../../../common/provincesAndCitiesSelect/provincesAndCitiesSelect.vue'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'

  export default {
    data () {
      return {
        province: '',
        city: '',
        fundData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        status: '',
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '是',
          label: '是'
        }, {
          value: '否',
          label: '否'
        }]
      }
    },
    components: {
      banner,
      selectCity
    },
    created () {
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.getData()
      },
      getData () {
        this.axios.post('/api/promotionRegionStatistics', {
          province: this.province,
          city: this.city,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
        })
      },
      getCount () {
        this.axios.post('/api/promotionRegionStatistics/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.count = response.data[0].count
        })
      },
      search () {
        if (this.startTime !== '') {
          this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        this.getData()
      },
      getSelectCity (msg) {
        this.city = msg
      },
      getSelectProvince (msg) {
        this.province = msg
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px
    .selectContent
      display: inline-block
      vertical-align: middle
      .el-col-5
        width: 200px
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
