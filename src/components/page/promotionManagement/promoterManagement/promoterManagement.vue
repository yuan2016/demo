<template>
  <div class="promoterManagement">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">推广员姓名：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">推广员电话：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <span class="managerFront">渠道商：</span>
      <el-select v-model.trim="channel_name" filterable clearable size="small" placeholder="不限" class="promoterSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="managerFront">添加时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="userListTimeSelect"></el-date-picker>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto" height="500">
      <el-table-column property="realname" label="推广员姓名"></el-table-column>
      <el-table-column property="user_phone" label="推广员电话"></el-table-column>
      <el-table-column property="channel_name" label="渠道商名称"></el-table-column>
      <el-table-column property="operator_name" label="负责人"></el-table-column>
      <el-table-column property="channel_tel" label="联系方式"></el-table-column>
      <el-table-column property="created_at" sortable label="创建时间"></el-table-column>
      <el-table-column property="rel_path" label="推广二维码"></el-table-column>
      <el-table-column property="ref_id" label="推广链接"></el-table-column>

    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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
        realname: '',
        user_phone: '',
        channel_name: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        options: [],
        status: ''
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getSelectOptions()
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
        this.axios.post('/api/promoterManagement', {
          realname: this.realname,
          user_phone: this.user_phone,
          channel_name: this.channel_name,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          this.fundData = response.data
          this.loading = false
        })
      },
      getSelectOptions () {
        this.axios.post('/api/promoterManagement/getSelectOptions').then((response) => {
          this.options = response.data
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
.promoterManagement
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    height 60px
    .managerFront
      padding-left :5px
      font-size: 14px
      color: #666
    .managerText
      width: 150px
    .userButton
      margin-left: 5px
    .userListTimeSelect
      width: 120px
    .promoterSelect
      width: 120px


  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
