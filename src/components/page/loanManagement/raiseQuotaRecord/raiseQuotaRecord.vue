<template>
  <div class="raiseQuotaRecord">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
      <span class="managerFront">姓名：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">手机号：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border height="740" stripe style="width: 100%">
      <el-table-column property="user_id" label="用户ID" width="70px"></el-table-column>
      <el-table-column property="realname" label="姓名" width="70px"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="new_amount_max" label="提额后总额度(元)"></el-table-column>
      <el-table-column property="add_amount" label="本次提升额度(元)"></el-table-column>
      <el-table-column property="repayment_succ_count" label="成功还款次数"></el-table-column>
      <el-table-column property="repayment_norm_count" label="正常还款次数"></el-table-column>
      <el-table-column property="repayment_succ_amount" label="成功还款金额(元)"></el-table-column>
      <el-table-column property="repayment_norm_amount" label="正常还款金额(元)"></el-table-column>
      <el-table-column property="last_apply_at" sortable label="上次提额时间"></el-table-column>
      <el-table-column property="create_at" sortable label="创建时间"></el-table-column>
      <el-table-column property="updated_at" sortable label="更新时间"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="audit_user" label="操作人"></el-table-column>
      <el-table-column property="remark" label="备注" width="230px"></el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="sizes"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  export default {
    data () {
      return {
        user_id: '',
        realname: '',
        user_phone: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
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
        this.axios.post('/api/raiseQuotaRecord', {
          user_id: this.user_id,
          realname: this.realname,
          user_phone: this.user_phone,
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      /*getCount () {
       this.axios.post('/api/raiseQuotaRecord/count', {
       id: this.id,
       realname: this.realname,
       id_number: this.id_number
       }).then((response) => {
       this.count = response.data[0].count
       })
       },*/
      search () {
        this.loading = true
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .date-filter
    padding: 15px 0 15px 1px
    .managerFront
      padding-left :5px
      font-size: 14px
      color: #666
    .managerText
      width: 180px
    /*&:before*/
    /*position: absolute*/
    /*right: 10px*/
    /*top: 8px*/
    /*content: "X"*/
    /*font-size: 16px*/
    /*color: #ccc*/
    .userButton
      margin-left: 5px

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
