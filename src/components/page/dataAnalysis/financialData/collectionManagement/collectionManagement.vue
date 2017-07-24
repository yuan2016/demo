<template>
  <div class="collectionManagement">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">日期：</span>
      <el-date-picker
        v-model.trim="startTime"
        type="date"
        placeholder="从">
      </el-date-picker>
      <el-date-picker
        v-model.trim="endTime"
        type="date"
        placeholder="到">
      </el-date-picker>
      <el-button type="primary" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="d_date" sortable label="日期" width="80px"></el-table-column>
      <el-table-column property="overdue_total" label="当日逾期总额(元)" width="100px"></el-table-column>
      <el-table-column label="S1">
        <el-table-column property="overdue_payment_s1" label="S1逾期回款(元)"></el-table-column>
        <el-table-column property="overdue_index_s1" label="S1-K/D"></el-table-column>
        <el-table-column property="late_fee_s1" label="S1滞纳金收入(元)"></el-table-column>
      </el-table-column>
      <el-table-column label="S2">
        <el-table-column property="overdue_payment_s2" label="S2逾期回款(元)"></el-table-column>
        <el-table-column property="overdue_index_s2" label="S2-K/D"></el-table-column>
        <el-table-column property="late_fee_s2" label="S2滞纳金收入(元)"></el-table-column>
      </el-table-column>
      <el-table-column label="M2">
        <el-table-column property="overdue_payment_m2" label="M2逾期回款(元)"></el-table-column>
        <el-table-column property="overdue_index_m2" label="M2-K/D"></el-table-column>
        <el-table-column property="late_fee_m2" label="M2滞纳金收入(元)"></el-table-column>
      </el-table-column>
      <el-table-column label="M3">
        <el-table-column property="overdue_payment_m3" label="M3逾期回款(元)"></el-table-column>
        <el-table-column property="overdue_index_m3" label="M3-K/D"></el-table-column>
        <el-table-column property="late_fee_m3" label="M3滞纳金收入(元)"></el-table-column>
      </el-table-column>
      <el-table-column property="bad_debt_m3" label="当日M3+(坏账)(元)" width="120px"></el-table-column>
      <el-table-column property="comp_late_fee" label="综合滞纳金(元)"></el-table-column>
      <el-table-column property="overdue_index_m4" label="M3+-K/D"></el-table-column>
      <el-table-column property="accu_late_fee" label="累计滞纳金收入(元)" width="110px"></el-table-column>
      <el-table-column property="create_time" sortable label="更新时间"></el-table-column>
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
  import banner from '../../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../../common/js/utils'
  export default {
    data () {
      return {
        fundData: [],
        loading: false,
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
      this.getCount()
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getData()
      },
      getData () {
        this.axios.post('/api/collectionManagement', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      getCount () {
        this.axios.post('/api/collectionManagement/count', {
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        }).then((response) => {
          this.count = response.data[0].count
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
        this.getCount()
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666

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
