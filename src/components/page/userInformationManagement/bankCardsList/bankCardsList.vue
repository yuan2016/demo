<template>
  <div class="addMember">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="id"></el-input>
      <span class="managerFront">联系人手机：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="user_id"></el-input>
      <span class="managerFront">联系人姓名：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="open_name"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border height="740" style="width: 100%">
      <el-table-column property="id" label="ID"></el-table-column>
      <el-table-column property="user_id" label="借款人ID"></el-table-column>
      <el-table-column property="open_name" label="持卡人签名"></el-table-column>
      <el-table-column property="phone" label="">手机号</el-table-column>
      <el-table-column property="bank_name" label="银行名称"></el-table-column>
      <el-table-column property="card_no" label="银行卡号"></el-table-column>
      <el-table-column property="main_card" label="是否主卡"></el-table-column>
      <el-table-column property="type" label="卡片类型"></el-table-column>
      <el-table-column property="card_status" label="状态"></el-table-column>
      <el-table-column property="create_time" label="添加时间"></el-table-column>
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
        id: '',
        user_id: '',
        open_name: '',
        fundData: [],
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
        this.axios.post('/api/bankcardsList', {
          id: this.id,
          user_id: this.user_id,
          open_name: this.open_name,
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          console.log(response.data)
          this.fundData = response.data
        })
      },
      search () {
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
      width:180px
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
