<template>
  <div class="promotionRegionStatistics" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <div class="selectContent">
          <select-city @selectCity="getSelectCity" @selectProvince="getSelectProvince"></select-city>
        </div>
      </li>
      <li>
        <span class="managerFront">日期：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect"></el-date-picker>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButtonSpecial" :loading="buttonLoading" @click.prevent.stop="refreshData">一键刷新</el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto;" :height="height" class="promotionRegionStatistics-table"  @sort-change="sort" >
      <el-table-column property="d_date" sortable="custom" label="日期"></el-table-column>
      <el-table-column property="Province" label="省份"></el-table-column>
      <el-table-column property="city" label="城市"></el-table-column>
      <el-table-column property="register_num" label="注册量"></el-table-column>
      <el-table-column property="realname_auth_num" label="实名认证"></el-table-column>
      <el-table-column property="card_bound_num" label="绑卡人数"></el-table-column>
      <el-table-column property="emergency_contact_num" label="紧急联系人"></el-table-column>
      <el-table-column property="operator_auth_num" label="运营商认证"></el-table-column>
      <el-table-column property="Alipay_auth_num" label="支付宝认证人数" width="110px"></el-table-column>
      <el-table-column property="Sesame_auth_num" label="芝麻认证人数"></el-table-column>
      <el-table-column property="jobinfo_auth_num" label="工作信息"></el-table-column>
      <el-table-column property="apply_loan_num" label="申请借款人数"></el-table-column>
      <el-table-column property="apply_succ_num" label="申请成功人数"></el-table-column>
      <el-table-column property="Pass_rate" label="通过率"></el-table-column>
      <el-table-column property="loan_amount" label="放款金额(元)"></el-table-column>
      <el-table-column property="blacklist_num" label="黑名单人数"></el-table-column>
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
  import selectCity from '../../../common/provincesAndCitiesSelect/provincesAndCitiesSelect.vue'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'

  export default {
    data () {
      return {
        province: '',
        city: '',
        fundData: [],
        loading: false,
        pageContent: 'sizes',
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
        }],
        height: 500,
        buttonLoading: false,
        dHeight: 500,
        order: ''
      }
    },
    components: {
      banner,
      selectCity
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
        return this.axios.post('/api/promotionRegionStatistics', {
          options: {
            province: this.province,
            city: this.city
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/promotionRegionStatistics/count', {
          options: {
            province: this.province,
            city: this.city
          },
          startTime: this.startTime,
          endTime: this.endTime
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
      },
      getSelectCity (msg) {
        this.city = msg
      },
      getSelectProvince (msg) {
        this.province = msg
      },
      refreshData () {
        this.buttonLoading = true
        this.axios.post('/api/promotionRegionStatistics/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '推广统计(地区)刷新完毕，请查看',
              type: 'success'
            })
          } else if (response.data.code === '400') {
            this.buttonLoading = false
            this.$message({
              message: '已经有用户在尝试刷新，请稍后刷新页面即可',
              type: 'warning'
            })
          } else {
            setTimeout(() => {
              this.buttonLoading = false
              this.$message.error('推广统计(地区)一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('推广统计(地区)一键刷新出现错误，请检查网络或联系管理员')
        })
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
        this.search(this.order)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .promotionRegionStatistics
    height: 100%
    .promotionRegionStatistics-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
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
          margin-left: 10px
        .userButtonSpecial
          margin-left: 10px
        .userListTimeSelect
          width: 120px
        .userListSelect
          width: 80px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
