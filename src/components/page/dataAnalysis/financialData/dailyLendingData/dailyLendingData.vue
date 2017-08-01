<template>
  <div class="dailyLendingData">
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
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto;" height="500">
      <el-table-column property="d_date" fixed sortable label="日期" width="130px" sortable></el-table-column>
      <el-table-column property="register_num" label="注册人数" width="130px"></el-table-column>
      <el-table-column property="loan_num" label="借款人数" width="130px"></el-table-column>
      <el-table-column property="success_loan_num" label="成功借款人数" width="130px"></el-table-column>
      <el-table-column property="loan_singular" label="放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_7day" label="7天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_14day" label="14天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_21day" label="21天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_f_21day" label="21天分期放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total" label="放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_7day" label="7天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_14day" label="14天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_21day" label="21天期限放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loans_total_f_21day" label="21天分期放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loan_singular_ouser" label="老用户放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total_ouser" label="老用户放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="loan_singular_nuser" label="新用户放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total_nuser" label="新用户放款总额(元)" width="130px"></el-table-column>
      <el-table-column property="create_time" label="更新时间" width="130px"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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
        endTime: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
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
          this.$message.error('搜索出现错误，请重试')
        })
      },
      getData () {
        return this.axios.post('/api/dailyLendingData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      getCount () {
        return this.axios.post('/api/dailyLendingData/count', {
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
.dailyLendingData
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    height 60px
    .managerFront
      padding-left :5px
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

