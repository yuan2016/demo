<template>
  <div class="renewalReconciliation" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      </li>
      <li>
        <span class="managerFrontShort">订单号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="order_id"></el-input>
      </li>
      <li>
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
      </li>
      <li>
        <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table :data="fundData" class="renewalReconciliation-table"
              highlight-current-row border stripe style="width: 100%;overflow: auto;" :height="height" @sort-change="sort">
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
      <el-table-column property="old_repayment_time" sortable="custom" label="续期前应还时间" width="130px"></el-table-column>
      <el-table-column property="repayment_time" sortable="custom" label="续期后应还时间" width="130px"></el-table-column>
      <el-table-column property="renewal_type" label="续期方式"></el-table-column>
      <el-table-column property="renewal_status" label="续期状态"></el-table-column>
      <el-table-column property="order_time" sortable="custom" label="续期时间" width="130"></el-table-column>
      <el-table-column property="lending_account" label="还款账户"></el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
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
        isShowPage: false,
        pageContent: 'sizes',
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '1',
          label: '富友'
        }, {
          value: '2',
          label: '支付宝'
        }, {
          value: '3',
          label: '连连'
        }, {
          value: '4',
          label: '益码通支付宝'
        }],
        height: 500,
        dHeight: 500,
        order: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
    },
    mounted () {
      this.resizeHeight()
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
        this.axios.post('/api/renewalReconciliation', {
          options: {
            order_id: this.order_id,
            repayment_type: this.repayment_type,
            user_phone: this.user_phone
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: this.order
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
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData () {
        return this.axios.post('/api/renewalReconciliation', {
          options: {
            order_id: this.order_id,
            repayment_type: this.repayment_type,
            user_phone: this.user_phone
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/renewalReconciliation/count', {
          options: {
            order_id: this.order_id,
            repayment_type: this.repayment_type,
            user_phone: this.user_phone
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.order_id === '' && this.renewal_type === '' && this.user_phone === '' && this.startTime === '' && this.endTime === '') {
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
            this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
          })
        }
      },
      resizeHeight () {
        this.setHeight()
        window.onresize = this.setHeight
      },
      setHeight () {
        let docH = document.documentElement.clientHeight
        let banner = document.getElementsByClassName('banner')[0]
        let bannerH = 0
        let filter = document.getElementsByClassName('date-filter')[0]
        let filterH = 0
        let page = document.getElementsByClassName('el-pagination')[0]
        let pageH = 0
        if (banner) {
          bannerH = banner.offsetHeight
        }
        if (filter) {
          filterH = filter.clientHeight
        }
        if (page) {
          if (page.offsetHeight !== 0) {
            pageH = page.offsetHeight
          } else {
            pageH = 32
          }
        } else {
          pageH = 60
        }
        this.height = docH - filterH - bannerH - pageH - 85 /*90+20*/
        this.dHeight = docH - 90
      },
      sort (info) {
        if (info.order === 'ascending') {
          this.order = ' order by ' + info.prop + ' asc'
        } else if (info.order === 'descending') {
          this.order = ' order by ' + info.prop + ' desc'
        } else {
          this.order = ''
        }
        this.search()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .renewalReconciliation
    height: 100%
    .renewalReconciliation-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        .managerFront,.managerFrontShort
          display: inline-block
          padding-left: 5px
          width: 70px
          text-align:left
          font-size: 14px
          color: #666
        .managerFrontShort
          width:70px
        .managerText
          width: 135px
        .loanAuditButton
          margin-left: 10px
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
