<template>
  <div class="userNameAuthenticationList">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="id"></el-input>
      <span class="managerFront">真实姓名：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">身份证号：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="id_number"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" stripe highlight-current-row border style="width: 99%;overflow: auto">
      <el-table-column property="id" label="用户ID"></el-table-column>
      <el-table-column property="realname" label="真实姓名"></el-table-column>
      <el-table-column property="id_number" label="身份证号"></el-table-column>
      <el-table-column property="create_time" sortable label="添加时间"></el-table-column>
      <el-table-column property="update_time" sortable label="修改时间"></el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center;margin-top: 10px;">
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
        id_number: '',
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
        this.axios.post('/api/userNameAuthenticationList', {
          id: this.id,
          realname: this.realname,
          id_number: this.id_number,
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      /*getCount () {
        this.axios.post('/api/userNameAuthenticationList/count', {
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
.userNameAuthenticationList
  height:100%
  .date-filter
    padding: 15px 0 15px 1px
    height:4%
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

  /*.el-col-4*/
    /*width: 15.66667%*/

  /*.el-col-20*/
    /*width: 84.33333%*/
  .userTable
    height: 74%
  .pagination
    padding-top :1.5%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
