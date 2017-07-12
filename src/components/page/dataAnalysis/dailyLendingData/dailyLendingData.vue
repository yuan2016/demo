<template>
  <div class="dailyLendingData">
    <banner></banner>
    <div class="date-filter">
      <el-date-picker
        v-model="startTime"
        type="date"
        placeholder="从">
      </el-date-picker>
      <el-date-picker
        v-model="endTime"
        type="date"
        placeholder="到">
      </el-date-picker>
      <el-button type="primary" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border height="740" style="width: 100%">
      <el-table-column property="d_date" label="日期" width="130px" sortable></el-table-column>
      <el-table-column property="register_num" label="注册人数" width="130px"></el-table-column>
      <el-table-column property="loan_num" label="借款人数" width="130px"></el-table-column>
      <el-table-column property="success_loan_num" label="成功借款人数" width="130px"></el-table-column>
      <el-table-column property="loan_singular" label="放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_7day" label="7天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_14day" label="14天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_21day" label="21天期限放款单数" width="130px"></el-table-column>
      <el-table-column property="loan_singular_f_21day" label="21天分期放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total" label="放款总额" width="130px"></el-table-column>
      <el-table-column property="loans_total_7day" label="7天期限放款总额" width="130px"></el-table-column>
      <el-table-column property="loans_total_14day" label="14天期限放款总额" width="130px"></el-table-column>
      <el-table-column property="loans_total_21day" label="21天期限放款总额" width="130px"></el-table-column>
      <el-table-column property="loans_total_f_21day" label="21天分期放款总额" width="130px"></el-table-column>
      <el-table-column property="loan_singular_ouser" label="老用户放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total_ouser" label="老用户放款总额" width="130px"></el-table-column>
      <el-table-column property="loan_singular_nuser" label="新用户放款单数" width="130px"></el-table-column>
      <el-table-column property="loans_total_nuser" label="新用户放款总额" width="130px"></el-table-column>
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
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'
  export default {
    data () {
      return {
        fundData: [],
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
      this.getCount()
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
        this.axios.post('/api/dailyLendingData', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.fundData = response.data
        })
      },
      getCount () {
        this.axios.post('/api/dailyLendingData/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.count = response.data[0].count
        })
      },
      search () {
        if (this.startTime !== '') {
          this.startTime = formatDate(this.startTime, 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(this.endTime, 'yyyy-MM-dd')
        }
        this.getCount()
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px

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

