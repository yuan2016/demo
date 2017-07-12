<template>
  <div class="addMember">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="id"></el-input>
      <span class="managerFront">联系人手机：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="realname"></el-input>
      <span class="managerFront">联系人姓名：</span><el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model="company_name"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border height="740" style="width: 100%">
      <el-table-column property="id" label="用户ID"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="company_name" label="公司名称"></el-table-column>
      <el-table-column property="user_phone" label="联系方式"></el-table-column>
      <el-table-column property="id_number" label="生日"></el-table-column>
      <el-table-column property="user_sex" label="性别"></el-table-column>
      <el-table-column property="status" label="是否黑名单"></el-table-column>
      <el-table-column property="create_time" label="创建时间"></el-table-column>

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
        realname: '',
        company_name: '',
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
        this.axios.post('/api/userList', {
          id: this.id,
          realname: this.realname,
          company_name: this.company_name,
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
