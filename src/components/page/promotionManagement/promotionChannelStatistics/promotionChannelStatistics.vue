<template>
  <div class="promotionChannelStatistics" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">渠道商名称：</span>
        <el-select v-model.trim="channel_trader_name" filterable clearable size="small" placeholder="不限"
                   class="promotionChannelSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <span class="managerFront">日期：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从" class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到" class="userListTimeSelect"></el-date-picker>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
      <li>
        <el-button type="primary" size="small" :loading="buttonLoading" @click.prevent.stop="refreshData"class="userButtonSpecial">一键刷新</el-button>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButtonSpecial">
          <a :href="mosaicLink" class="promotionChannelStatisticsExcel">导出excel</a>
        </el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto" :height="height" class="promotionChannelStatistics-table" @sort-change="sort" >
      <el-table-column property="d_date" sortable="custom" fixed label="日期"></el-table-column>
      <el-table-column property="channel_trader_name" label="渠道商名称"></el-table-column>
      <el-table-column property="settle_method" label="结算方式" width="170px"></el-table-column>
      <el-table-column property="effe_cust_acqu_cost" label="有效获客成本(元)" width="100px"></el-table-column>
      <el-table-column property="day_consumption" label="当日消耗(元)"></el-table-column>
      <el-table-column property="register_num" label="注册量"></el-table-column>
      <el-table-column property="all_fact_auth_num" label="全要素认证人数" width="100px"></el-table-column>
      <el-table-column property="apply_loan_num" label="申请借款人数" width="100px"></el-table-column>
      <el-table-column property="blacklist_num" label="黑名单人数"></el-table-column>
      <el-table-column property="entries_num" label="进件数"></el-table-column>
      <el-table-column property="nuser_apply_succ_num" label="新用户申请成功人数" width="130"></el-table-column>
      <el-table-column property="ouser_apply_succ_num" label="老用户申请成功人数" width="130"></el-table-column>
      <el-table-column property="nuser_loan_ratio" label="新用户借款率" width="100px"></el-table-column>
      <el-table-column property="nuser_adoption_rate" label="新用户通过率" width="100px"></el-table-column>
      <el-table-column property="nuser_loan_amount" label="新用户放款金额(元)" width="120"></el-table-column>
      <el-table-column property="ouser_adoption_rate" label="老用户通过率"></el-table-column>
      <el-table-column property="ouser_loan_amount" label="老用户放款金额(元)" width="120"></el-table-column>
      <el-table-column property="DUE_AMOUNT" label="到期金额(元)" width="100"></el-table-column>
      <el-table-column property="overdue_num" label="逾期人数"></el-table-column>
      <el-table-column property="OVERDUE_AMOUNT" label="逾期金额(元)" width="100"></el-table-column>
      <el-table-column property="BADDEBT_RATE" label="坏账率"></el-table-column>
      <el-table-column property="BADDEBT_amount" label="坏账金额(元)"></el-table-column>
      <el-table-column property="baddebt_amount_unit" label="单位坏账金额(元)" width="100"></el-table-column>
      <el-table-column property="UNITGROSS_PROFIT" label="单位毛利润(元)" width="100"></el-table-column>
      <el-table-column property="create_time" sortable="custom" label="更新时间" width="130"></el-table-column>
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
        channel_trader: '',
        channel_trader_name: '',
        fundData: [],
        loading: false,
        options: [],
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        height: 500,
        buttonLoading: false,
        dHeight: 500,
        order: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getSelectOptions()
      this.getDataInit()
    },
    mounted () {
      this.resizeHeight()
    },
    computed: {
      mosaicLink () {
        let channelTraderName = this.channel_trader_name
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
        return 'api/promotionChannelStatistics/excel?channel_trader_name=' + channelTraderName + '&startTime=' + startTime + '&endTime=' + endTime
      }
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
        return this.axios.post('/api/promotionChannelStatistics', {
          options: {
            channel_trader: this.channel_trader,
            channel_trader_name: this.channel_trader_name
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/promotionChannelStatistics/count', {
          options: {
            channel_trader: this.channel_trader,
            channel_trader_name: this.channel_trader_name
          },
          startTime: this.startTime,
          endTime: this.endTime
        })
      },
      getSelectOptions () {
        this.axios.post('/api/promotionChannelStatistics/getSelectOptions').then((response) => {
          this.options = response.data
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
      refreshData () {
        this.buttonLoading = true
        this.axios.post('/api/promotionChannelStatistics/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '推广统计(渠道)刷新完毕，请查看',
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
              this.$message.error('推广统计(渠道)一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('推广统计(渠道)一键刷新出现错误，请检查网络或联系管理员')
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
.promotionChannelStatistics
  height: 100%
  .promotionChannelStatistics-table
    border-radius :10px
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    display: flex
    flex-wrap: wrap
    li
      margin-bottom: 5px
      .managerFront
        padding-left :5px
        font-size: 14px
        color: #666
      .managerText
        width: 180px
      .userButton
        margin-left: 10px
      .userButtonSpecial
        margin-left: 10px
      .promotionChannelSelect
        width: 150px
      .promotionChannelStatisticsExcel
        color :#fff


  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
