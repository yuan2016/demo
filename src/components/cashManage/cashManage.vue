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
      <el-table-column property="payback_date" label="应还日期"></el-table-column>
      <el-table-column property="count" label="应还金额"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
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
        tableData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 1000,
        currentPage: 1
      }
    },
    created () {
      this.axios.post('/api/cashManage').then((response) => {
        console.log(response.data)
        this.tableData = response.data
      })
    },
    method: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.getUsers()
      }
    },
    components: {
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
