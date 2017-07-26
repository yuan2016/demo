<template>
  <div class="promotionChannel">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">渠道商名称：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_name"></el-input>
      <span class="managerFront">负责人：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="operator_name"></el-input>
      <span class="managerFront">联系方式：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_tel"></el-input>
      <span class="managerFront">添加时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从" class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到" class="userListTimeSelect"></el-date-picker>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto">
      <el-table-column property="channel_name" label="渠道商名称"></el-table-column>
      <el-table-column property="channel_code" label="渠道商编码"></el-table-column>
      <el-table-column property="operator_name" label="负责人"></el-table-column>
      <el-table-column property="channel_tel" label="联系方式"></el-table-column>
      <el-table-column property="channel_province" label="省份"></el-table-column>
      <el-table-column property="channel_city" label="城市"></el-table-column>
      <el-table-column property="channel_area" label="地区"></el-table-column>
      <el-table-column property="canal_rate_name" label="计费方式"></el-table-column>
      <el-table-column property="created_at" sortable label="创建时间"></el-table-column>

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
        channel_name: '',
        operator_name: '',
        channel_tel: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        status: ''
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
        this.axios.post('/api/promotionChannel', {
          channel_name: this.channel_name,
          operator_name: this.operator_name,
          channel_tel: this.channel_tel,
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
.promotionChannel
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    height: 4%
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666
    .managerText
      width: 140px
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
