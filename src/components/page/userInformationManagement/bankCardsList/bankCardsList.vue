<template>
  <div class="bankCardsList">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">借款人ID：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
        <span class="managerFront">持卡人姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="open_name"></el-input>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="phone"></el-input>
      </li>
      <li>
        <span class="managerFront">银行卡号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="card_no"></el-input>
        <span class="managerFront">添加时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect"></el-date-picker>
        <span class="managerFront">状态：</span>
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
    <el-table v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 99%;overflow: auto">
      <el-table-column property="id" label="ID" width="80px"></el-table-column>
      <el-table-column property="user_id" label="借款人ID" width="80px"></el-table-column>
      <el-table-column property="open_name" label="持卡人姓名"></el-table-column>
      <el-table-column property="phone" label="手机号"></el-table-column>
      <el-table-column property="bank_name" label="银行名称"></el-table-column>
      <el-table-column property="card_no" label="银行卡号"></el-table-column>
      <el-table-column property="main_card" label="是否主卡" width="80px"></el-table-column>
      <el-table-column property="type" label="卡片类型"></el-table-column>
      <el-table-column property="card_status" label="状态"></el-table-column>
      <el-table-column property="create_time" sortable label="添加时间"></el-table-column>
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
        user_id: '',
        open_name: '',
        phone: '',
        card_no: '',
        status: '',
        startTime: '',
        endTime: '',
        loading: false,
        fundData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '1',
          label: '生效'
        }, {
          value: '0',
          label: '无效'
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
        this.axios.post('/api/bankcardsList', {
          user_id: this.user_id,
          open_name: this.open_name,
          phone: this.phone,
          card_no: this.card_no,
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
.bankCardsList
  height: 100%
  .date-filter
    height: 8%
    padding: 15px 0 15px 1px
    li
      margin-bottom :5px
    .managerFront
      display: inline-block
      padding-left: 5px
      font-size: 14px
      width: 90px
      text-align:right
      color: #666
    .managerText
      width: 188px
    .userButton
      margin-left: 5px
    .userListTimeSelect
      width: 120px
    .userListSelect
      width: 80px
  .userTable
    height: 70%
  .pagination
    padding-top :1.5%

  /*.el-col-4*/
  /*width: 15.66667%*/

  /*.el-col-20*/
  /*width: 84.33333%*/

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
