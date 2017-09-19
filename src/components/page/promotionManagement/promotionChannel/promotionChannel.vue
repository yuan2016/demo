<template>
  <div class="promotionChannel" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">渠道商名称：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_name"></el-input>
      </li>
      <li>
        <span class="managerFront">负责人：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText"
                  v-model.trim="operator_name"></el-input>
      </li>
      <li>
        <span class="managerFront">联系方式：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="channel_tel"></el-input>
      </li>
      <li>
        <span class="managerFront">添加时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect"></el-date-picker>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe class="promotionChannel-table"
              style="width: 100%;overflow: auto" :height="height">
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

  export default {
    data () {
      return {
        channel_name: '',
        operator_name: '',
        channel_tel: '',
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
        status: '',
        height: 500,
        dHeight: 500
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
    },
    mounted () {
      this.resizeHeight()
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
        return this.axios.post('/api/promotionChannel', {
          channel_name: this.channel_name,
          operator_name: this.operator_name,
          channel_tel: this.channel_tel,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/promotionChannel/count', {
          channel_name: this.channel_name,
          operator_name: this.operator_name,
          channel_tel: this.channel_tel,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate()
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.startTime !== '') {
          this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        this.getDataInit()
      },
      resizeHeight () {
        this.setHeight()
        window.onresize = this.setHeight
      },
      setHeight () {
        let docH = document.documentElement.clientHeight
        let banner = document.getElementsByClassName('banner')[0]
        let bannerH = 0
        let filter = document.getElementsByClassName('date-filter')[0]
        let filterH = 0
        let page = document.getElementsByClassName('el-pagination')[0]
        let pageH = 0
        if (banner) {
          bannerH = banner.offsetHeight
        }
        if (filter) {
          filterH = filter.clientHeight
        }
        if (page) {
          if (page.offsetHeight !== 0) {
            pageH = page.offsetHeight
          } else {
            pageH = 32
          }
        } else {
          pageH = 60
        }
        this.height = docH - filterH - bannerH - pageH - 85 /*90+20*/
        this.dHeight = docH - 90
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .promotionChannel
    height: 100%
    .promotionChannel-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        margin-right: 20px
        .managerFront
          display: inline-block
          width: 90px
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

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
