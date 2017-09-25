<template>
  <div class="userList" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">用户ID：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="id"
                  @keyup.enter.native="search" icon="el-icon-search"></el-input>
      </li>
      <li>
        <span class="managerFront">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"
                  @keyup.enter.native="search"></el-input>
      </li>
      <li>
        <span class="managerFront">证件号码：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="id_number"
                  @keyup.enter.native="search"></el-input>
      </li>
      <li>
        <span class="managerFront">联系方式：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"
                  @keyup.enter.native="search"></el-input>
      </li>
      <li>
        <span class="managerFront">创建时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect" @keyup.enter.native="search"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect" @keyup.enter.native="search"></el-date-picker>
      </li>
      <li>
        <span class="managerFront">是否黑名单：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="userListSelect"
                   @keyup.enter.native="search">
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
    <el-table stripe :data="fundData" highlight-current-row border
              :height="height" style="width:100%;overflow: auto" @sort-change="sort" class="userList-table">
      <el-table-column property="id" label="用户ID"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="company_name" label="公司名称"></el-table-column>
      <el-table-column property="user_phone" label="联系方式"></el-table-column>
      <el-table-column property="id_number" label="证件号码"></el-table-column>
      <el-table-column property="birthday" sortable="custom" label="生日"></el-table-column>
      <el-table-column property="user_sex" label="性别" width="100"></el-table-column>
      <el-table-column property="status" label="是否黑名单"></el-table-column>
      <el-table-column property="create_time" sortable="custom" label="创建时间"></el-table-column>
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
        isShowPage: false,
        pageContent: 'sizes',
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
        }],
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
      getDataInit (order) {
        this.axios.post('/api/userList', {
          options: {
            id: this.id,
            realname: this.realname,
            id_number: this.id_number,
            user_phone: this.user_phone,
            status: this.status
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: order
        }).then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.loading = false
            this.$message({
              message: '请求超时，请增加搜索条件以便搜索',
              type: 'warning'
            })
          } else {
            this.fundData = response.data
            this.loading = false
          }
        }).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData (order) {
        return this.axios.post('/api/userList', {
          options: {
            id: this.id,
            realname: this.realname,
            id_number: this.id_number,
            user_phone: this.user_phone,
            status: this.status
          },
          startTime: this.startTime,
          endTime: this.endTime,
          limit: this.limit,
          offset: this.offset,
          order: order
        })
      },
      getCount () {
        return this.axios.post('/api/userList/count', {
          options: {
            id: this.id,
            realname: this.realname,
            id_number: this.id_number,
            user_phone: this.user_phone,
            status: this.status
          },
          startTime: this.startTime,
          endTime: this.endTime
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.id === '' && this.realname === '' && this.id_number === '' && this.user_phone === '' && this.status === '' && this.startTime === '' && this.endTime === '') {
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
          if (this.startTime !== '') {
            this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
          }
          if (this.endTime !== '') {
            this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
          }
          this.isShowPage = true
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
        }
      },
      sortSearch (order) {
        this.loading = true
        this.pageContent = ''
        if (this.id === '' && this.realname === '' && this.id_number === '' && this.user_phone === '' && this.status === '' && this.startTime === '' && this.endTime === '') {
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit(order)
        } else {
          if (this.startTime !== '') {
            this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
          }
          if (this.endTime !== '') {
            this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
          }
          this.isShowPage = true
          this.axios.all([this.getCount(), this.getData(order)])
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
        }
      },
      sort (info) {
        let order
        if (info.order === 'ascending') {
          order = ' order by ' + info.prop + ' asc'
        } else if (info.order === 'descending') {
          order = ' order by ' + info.prop + ' desc'
        }
        this.sortSearch(order)
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
  .userList
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing: border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        .managerFront
          display: inline-block
          width: 90px
          padding-left: 5px
          font-size: 14px
          color: #666
        .managerText
          width: 160px
        .userButton
          margin-left: 5px
        .userListTimeSelect
          width: 120px
        .userListSelect
          width: 80px
    .userList-table
      border-radius :10px
    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold

  @media (min-width:1368px)
    .userList
      .date-filter
          li
            margin-right: 0
            .managerFront
              text-align:right
              width:auto


</style>
