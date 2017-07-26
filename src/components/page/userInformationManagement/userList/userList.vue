<template>
  <div class="userList">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">用户ID：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="id"></el-input>
        <span class="managerFront">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
        <span class="managerFront">证件号码：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="id_number"></el-input>
      </li>
      <li>
        <span class="managerFront">联系方式：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
        <span class="managerFront">创建时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect"></el-date-picker>
        <span class="managerFront">是否黑名单：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="userListSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" stripe :data="fundData" highlight-current-row
              border class="userTable" style="width: 99%;overflow: auto">
      <el-table-column property="id" label="用户ID" width="70px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="company_name" label="公司名称"></el-table-column>
      <el-table-column property="user_phone" label="联系方式"></el-table-column>
      <el-table-column property="id_number" label="证件号码"></el-table-column>
      <el-table-column property="birthday" sortable label="生日"></el-table-column>
      <el-table-column property="user_sex" label="性别" width="50px"></el-table-column>
      <el-table-column property="status" label="是否黑名单"></el-table-column>
      <el-table-column property="create_time" sortable label="创建时间"></el-table-column>
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
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'

  export default {
    data () {
      return {
        id: '',
        realname: '',
        id_number: '',
        user_phone: '',
        status: '',
        fundData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        loading: false,
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '2',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }]
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
        this.axios.post('/api/userList', {
          id: this.id,
          realname: this.realname,
          id_number: this.id_number,
          user_phone: this.user_phone,
          status: this.status,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
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
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userList
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      height: 8%
      li
        margin-bottom :5px
      .managerFront
        display: inline-block
        padding-left: 5px
        width: 90px
        text-align:right
        font-size: 14px
        color: #666
      .managerText
        width: 188px
      .userButton
        margin-left: 5px
      .userListTimeSelect
        width: 120px
      .userListSelect
        width: 80px

    /*.el-col-4*/
    /*width: 15.66667%*/

    /*.el-col-20*/
    /*width: 84.33333%*/
    .userTable
      height: 70%
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
