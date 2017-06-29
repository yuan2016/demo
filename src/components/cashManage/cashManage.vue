<template>
  <div class="cash_manage">
    <banner></banner>
    <el-table :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="registe_time" label="注册日期"></el-table-column>
      <el-table-column property="username" label="用户姓名"></el-table-column>
      <el-table-column property="city" label="注册地址"></el-table-column>
      <el-table-column property="borrow_date" label="借款日期"></el-table-column>
      <el-table-column property="amount" label="借款金额"></el-table-column>
      <el-table-column property="interest" label="借款利息"></el-table-column>
      <el-table-column property="per_day" label="单日利息"></el-table-column>
      <el-table-column property="date" label="应还日期"></el-table-column>
      <el-table-column property="count" label="应还金额"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  export default {
    data () {
      return {
        tableData: [{
          registe_time: '2016-05-02',
          username: '张三',
          city: '上海',
          borrow_date: '2016-05-02',
          amount: '20000.00',
          interest: '300.00',
          per_day: '3.00',
          date: '2017-05-02',
          count: '25000.00'
        }, {
          registe_time: '2016-05-04',
          username: '李四',
          city: '北京',
          borrow_date: '2016-05-02',
          amount: '30000.00',
          interest: '300.00',
          per_day: '3.00',
          date: '2017-05-02',
          count: '25000.00'
        }, {
          registe_time: '2016-05-01',
          username: '王五',
          city: '广州',
          borrow_date: '2016-05-02',
          amount: '40000.00',
          interest: '300.00',
          per_day: '3.00',
          date: '2017-05-02',
          count: '25000.00'
        }, {
          registe_time: '2016-05-03',
          username: '小六',
          city: '深圳',
          borrow_date: '2016-05-02',
          amount: '20000.00',
          interest: '300.00',
          per_day: '3.00',
          date: '2017-05-02',
          count: '25000.00'
        }],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
      }
    },
    components: {
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
