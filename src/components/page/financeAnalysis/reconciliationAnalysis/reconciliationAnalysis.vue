<template>
  <div class="reconciliationAnalysis" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">日期：</span>
      <el-date-picker
        size="small"
        v-model.trim="startTime"
        type="date"
        placeholder="从">
      </el-date-picker>
      <el-date-picker
        size="small"
        v-model.trim="endTime"
        type="date"
        placeholder="到">
      </el-date-picker>
      <el-button type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
      <el-button type="primary" size="small" class="userButton" :loading="buttonLoading">
        <a :href="mosaicLink" class="reconciliationAnalysisExcel">导出excel</a>
      </el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto" :height="height">
      <el-table-column property="d_date" sortable label="日期" width="80px"></el-table-column>
      <el-table-column label="富友账户">
        <el-table-column property="AMT_FY" label="后台数据(元)"></el-table-column>
        <el-table-column property="" label="第三方数据"></el-table-column>
        <el-table-column property="" label="差异（后台-第三方）" width="120px"></el-table-column>
      </el-table-column>
      <el-table-column label="连连账户">
        <el-table-column property="AMT_LL" label="后台数据(元)"></el-table-column>
        <el-table-column property="" label="第三方数据"></el-table-column>
        <el-table-column property="" label="差异（后台-第三方）" width="120px"></el-table-column>
      </el-table-column>
      <el-table-column label="支付宝账户">
        <el-table-column property="AMT_ZFB" label="后台数据(元)"></el-table-column>
        <el-table-column property="" label="第三方数据"></el-table-column>
        <el-table-column property="" label="差异（后台-第三方）" width="120px"></el-table-column>
      </el-table-column>
      <el-table-column label="益码通支付宝账户">
        <el-table-column property="AMT_YMT" label="后台数据(元)"></el-table-column>
        <el-table-column property="" label="第三方数据"></el-table-column>
        <el-table-column property="" label="差异（后台-第三方）" width="120px"></el-table-column>
      </el-table-column>
      <el-table-column label="拉卡拉">
        <el-table-column property="AMT_LKL" label="后台数据(元)"></el-table-column>
        <el-table-column property="" label="第三方数据"></el-table-column>
        <el-table-column property="" label="差异（后台-第三方）" width="120px"></el-table-column>
      </el-table-column>
      <el-table-column label="批注">
        <el-table-column property="AMT_JM" label="线下免还款金额(元)"></el-table-column>
        <el-table-column property="" label="备注"></el-table-column>
      </el-table-column>
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
  import { getHeight } from '../../../../common/js/storage'

  export default {
    data () {
      return {
        fundData: [],
        loading: false,
        pageContent: 'sizes',
        currentRow: '',
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        height: 500,
        buttonLoading: false
      }
    },
    computed: {
      mosaicLink () {
        let startTime = this.startTime || '1991-07-22'
        let endTime = this.endTime || getNowFormatDate()
        return 'api/reconciliationAnalysis/excel?startTime=' + startTime + '&endTime=' + endTime
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
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
        return this.axios.post('/api/reconciliationAnalysis', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/reconciliationAnalysis/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .reconciliationAnalysis
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
        font-size: 14px
        color: #666
      .reconciliationAnalysisExcel
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
