<template>
  <div class="promoterManagement" v-loading.body="loading" element-loading-text="拼命加载中">
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
      <span class="managerFront">创建时间：</span>
      <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                      class="userListTimeSelect"></el-date-picker>
      <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                      class="userListTimeSelect"></el-date-picker>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto" :height="height" class="promoterManagement-table">
      <el-table-column prop="realname" label="推广员姓名" width="80"></el-table-column>
      <el-table-column prop="user_phone" label="推广员电话"></el-table-column>
      <el-table-column prop="channel_name" label="渠道商名称"></el-table-column>
      <el-table-column prop="operator_name" label="负责人"></el-table-column>
      <el-table-column prop="channel_tel" label="联系方式"></el-table-column>
      <el-table-column prop="created_at" sortable label="创建时间"></el-table-column>
      <el-table-column prop="rel_path" label="推广二维码"></el-table-column>
      <el-table-column prop="remark" label="推广链接" width="100">
        <template scope="scope"><a :href="scope.row.remark">点击查看</a></template>
      </el-table-column>

    </el-table>
    <div style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        :layout="pageContent"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'

  export default {
    data () {
      return {
        realname: '',
        user_phone: '',
        channel_name: '',
        fundData: [],
        loading: false,
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        options: [],
        status: '',
        height: 500
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getSelectOptions()
      this.getDataInit()
      this.height = parseInt(getHeight()) + 40
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getDataInit()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getDataInit()
      },
      getDataInit () {
        this.axios.all([this.getCount(), this.getData()])
          .then(this.axios.spread((acct, perms) => {
            if (perms.data.code === '404' || acct.data.code === '404') {
              this.$router.push('./404')
            } else if (perms.data.code === '1024' || acct.data.code === '1024') {
              this.fundData = []
              this.loading = false
              this.$message({
                message: '请求超时，请增加搜索条件以便搜索',
                type: 'warning'
              })
            } else {
              this.count = acct.data[0].count
              this.fundData = perms.data
              this.loading = false
              this.pageContent = 'total, sizes, prev, pager, next, jumper'
            }
          })).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData () {
        return this.axios.post('/api/promoterManagement', {
          realname: this.realname,
          user_phone: this.user_phone,
          channel_name: this.channel_name,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/promoterManagement/count', {
          realname: this.realname,
          user_phone: this.user_phone,
          channel_name: this.channel_name,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
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
        this.getDataInit()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .promoterManagement
    height: 100%
    .promoterManagement-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
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
