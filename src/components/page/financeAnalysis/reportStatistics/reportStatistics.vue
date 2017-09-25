<template>
  <div class="repaymentMinutia" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
     <li>
       <span class="managerFront">日期：</span>
       <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                       class="minutiaTimeSelect"></el-date-picker>
       <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                       class="minutiaTimeSelect"></el-date-picker>
     </li>
      <li>
        <el-button class="userButton" type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
        <el-button class="userButtonSpecial" type="primary" size="small" :loading="buttonLoading">
          <a :href="mosaicLink" class="repaymentMinutiaExcel">导出excel</a>
        </el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="repaymentMinutia-table"
              style="width: 100%;overflow: auto" :height="height"  @sort-change="sort">
      <el-table-column property="d_date" sortable="custom" label="日期"></el-table-column>
      <el-table-column property="service_charge" label="基础服务费(元)"></el-table-column>
      <el-table-column property="loan_urgent_fee" label="加急费(元)"></el-table-column>
      <el-table-column property="repaymented_amount" label="正常本金 (元)"></el-table-column>
      <el-table-column property="Overdue_amount" label="逾期本金 (元)"></el-table-column>
      <el-table-column property="loan_accrual" label="利息 "></el-table-column>
      <el-table-column property="stages_fee" label="分期费(元)"></el-table-column>
      <el-table-column property="renewal_service_fee" label="续期服务费(元)"></el-table-column>
      <el-table-column property="renewal_fee" label="续期手续费 (元)"></el-table-column>
      <el-table-column property="Overdue_fine" label="逾期滞纳金 (元)"></el-table-column>
      <el-table-column property="reduction_amount" label="催收减免金额(元)" width="150"></el-table-column>
      <el-table-column property="sum_amount" label="合计(元) "></el-table-column>
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

  export default {
    data () {
      return {
        fundData: [],
        loading: false,
        buttonLoading: false,
        d_date: '',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        pageContent: 'sizes',
        height: 500,
        dHeight: 500,
        order: ''
      }
    },
    computed: {
      mosaicLink () {
        let startTime
        let endTime
        if (this.startTime === '') {
          startTime = this.startTime
        } else {
          startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime === '') {
          endTime = this.endTime
        } else {
          endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        return 'api/reportStatistics/excel?startTime=' + startTime + '&endTime=' + endTime
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
        return this.axios.post('/api/reportStatistics', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime,
          endTime: this.endTime,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/reportStatistics/count', {
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
  .repaymentMinutia
    height: 100%
    .repaymentMinutia-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        .managerFront
          padding-left: 5px
          font-size: 14px
          color: #666
        .managerText
          width: 120px
        .shortManagerText
          width: 100px
        .userButton
          margin-left: 10px
        .userButtonSpecial
          margin-left :5px
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
