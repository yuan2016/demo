<template>
  <div class="userNameAuthenticationList" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">用户ID：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="id"></el-input>
      </li>
      <li>
        <span class="managerFront">真实姓名：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      </li>
      <li>
        <span class="managerFront">身份证号：</span><el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="id_number"></el-input>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </div>
    <el-table :data="fundData" stripe highlight-current-row border style="width: 100%;overflow: auto" :height="height" class="userNameAuthenticationList-table" @sort-change="sort">
      <el-table-column property="id" label="用户ID"></el-table-column>
      <el-table-column property="realname" label="真实姓名"></el-table-column>
      <el-table-column property="id_number" label="身份证号"></el-table-column>
      <el-table-column property="create_time" sortable="custom" label="添加时间"></el-table-column>
      <el-table-column property="update_time" sortable="custom" label="修改时间"></el-table-column>
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
  import { getHeight } from '../../../../common/js/storage'
  export default {
    data () {
      return {
        id: '',
        realname: '',
        id_number: '',
        fundData: [],
        loading: false,
        isShowPage: false,
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        height: 500,
        dHeight: 500,
        order: ''
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
        this.axios.post('/api/userNameAuthenticationList', {
          id: this.id,
          realname: this.realname,
          id_number: this.id_number,
          limit: this.limit,
          offset: this.offset,
          order: this.order
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
      getData () {
        return this.axios.post('/api/userNameAuthenticationList', {
          id: this.id,
          realname: this.realname,
          id_number: this.id_number,
          limit: this.limit,
          offset: this.offset,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/userNameAuthenticationList/count', {
          id: this.id,
          realname: this.realname,
          id_number: this.id_number
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.id === '' && this.realname === '' && this.id_number === '') {
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
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
      },
      sort (info) {
        if (info.order === 'ascending') {
          this.order = ' order by ' + info.prop + ' asc'
        } else if (info.order === 'descending') {
          this.order = ' order by ' + info.prop + ' desc'
        } else {
          this.order = ''
        }
        this.search(this.order)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.userNameAuthenticationList
  height:100%
  .date-filter
    padding: 15px 0 15px 1px
    box-sizing border-box
    display: flex
    flex-wrap: wrap
    li
      margin-bottom: 5px
      margin-right: 20px
      .managerFront
        padding-left :5px
        font-size: 14px
        color: #666
      .managerText
        width: 180px
      .userButton
        margin-left: 5px
  .userNameAuthenticationList-table
    border-radius :10px


  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold

  @media (max-width: 809px)
    .date-filter
      li
        .managerFront
          display: inline-block
          width: 90px
</style>
