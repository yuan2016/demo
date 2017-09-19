<template>
  <div class="promptAmount" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
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
      </li>
      <li>
        <el-button type="primary" size="small" @click.prevent.stop="search">搜索</el-button>
        <el-button type="primary" size="small" :loading="buttonLoading" @click.prevent.stop="refreshData">一键刷新</el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="promptAmount-table"
              style="width: 100%;overflow: auto;" :height="height">
      <el-table-column property="D_DATE" sortable fixed label="日期" ></el-table-column>
      <el-table-column property="OVERDUE_RATE" label="当日催回率"width="100"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DAY" label="当日入催本金(元)"width="100"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING" label="在催本金(元)"width="100"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_S1" label="S1在催本金(元)" width="100"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_RATE_S1" label="S1在催本金比例" width="100"></el-table-column>
      <el-table-column property="OVERDUE_RATE_S1_F" label="S1总和催回率" width="100"></el-table-column>
      <el-table-column property="OVERDUE_RATE_S1_P" label="S1当期催回率" width="100"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_S2" label="S2在催本金(元)"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_RATE_S2" label="S2在催本金比例"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_S2_F" label="S2总和催回率"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_S2_P" label="S2当期催回率"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_M2" label="M2在催本金(元)"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_RATE_M2" label="M2在催本金比例"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M2_F" label="M2总和催回率"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M2_P" label="M2当期催回率"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_M3" label="M3在催本金(元)"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_RATE_M3" label="M3在催本金比例"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M3_F" label="M3总和催回率"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M3_P" label="M3当期催回率"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_M3PLUS" label="M3+在催本金(元)"width="110"></el-table-column>
      <el-table-column property="COLLECTION_PRINCIPAL_DOING_RATE_M3PLUS" label="M3+在催本金比例"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M3PLUS_F" label="M3+总和催回率"width="110"></el-table-column>
      <el-table-column property="OVERDUE_RATE_M3PLUS_P" label="M3+当期催回率"width="110"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING" label="在催滞纳金"width="100"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING_S1" label="S1在催滞纳金"width="100"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING_S2" label="S2在催滞纳金"width="100"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING_M2" label="M2在催滞纳金"width="100"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING_M3" label="M3在催滞纳金"width="100"></el-table-column>
      <el-table-column property="COLLECTION_LATE_FEE_DOING_M3PLUS" label="M3+在催滞纳金"width="100"></el-table-column>
      <el-table-column property="UPDATE_TIME" label="更新时间" width="125"></el-table-column>
      <el-table-column property="CREATE_TIME" label="创建时间" width="125"></el-table-column>
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
  import banner from '../../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../../common/js/utils'

  export default {
    data () {
      return {
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
        height: 500,
        buttonLoading: false,
        dHeight: 500
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
        return this.axios.post('/api/promptAmount', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/promptAmount/count', {
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
      },
      refreshData () {
        this.buttonLoading = true
        this.axios.post('/api/promptAmount/refresh').then((response) => {
          if (response.data.code === '200') {
            this.getDataInit()
            this.buttonLoading = false
            this.$message({
              message: '在催金额刷新完毕，请查看',
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
              this.$message.error('在催金额一键刷新出现错误，请检查网络或联系管理员')
            }, 1000)
          }
        }).catch(() => {
          this.buttonLoading = false
          this.$message.error('在催金额一键刷新出现错误，请检查网络或联系管理员')
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .promptAmount
    height: 100%
    .promptAmount-table
      border-radius:10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        margin-right: 20px
        .managerFront
          padding-left: 5px
          font-size: 14px
          color: #666

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
