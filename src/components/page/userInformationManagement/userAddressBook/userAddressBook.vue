<template>
  <div class="userAddressBook" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
      <span class="managerFront">联系人手机：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText"
                v-model.trim="contact_phone"></el-input>
      <span class="managerFront">联系人：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="contact_name"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table class="userTable" :data="fundData" stripe
              highlight-current-row border height="500" style="width: 100%;overflow: auto">
      <el-table-column property="id" label="ID"></el-table-column>
      <el-table-column property="user_id" label="用户ID"></el-table-column>
      <el-table-column property="user_name" label="用户姓名/手机"></el-table-column>
      <el-table-column property="contact_name" label="联系人"></el-table-column>
      <el-table-column property="contact_phone" label="联系人手机"></el-table-column>
      <el-table-column property="create_time" sortable label="上传时间"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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

  export default {
    data () {
      return {
        user_id: '',
        contact_phone: '',
        contact_name: '',
        fundData: [],
        loading: false,
        isShowPage: false,
        pageContent: 'sizes',
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
      this.getDataInit()
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
        this.axios.post('/api/userAddressBook', {
          user_id: this.user_id,
          contact_phone: this.contact_phone,
          contact_name: this.contact_name,
          limit: this.limit,
          offset: this.offset
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
          this.$message.error('搜索出现错误，请重试')
        })
      },
      getData () {
        return this.axios.post('/api/userAddressBook', {
          user_id: this.user_id,
          contact_phone: this.contact_phone,
          contact_name: this.contact_name,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/userAddressBook/count', {
          user_id: this.user_id,
          contact_phone: this.contact_phone,
          contact_name: this.contact_name,
          limit: this.limit,
          offset: this.offset
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.user_id === '' && this.contact_phone === '' && this.contact_name === '') {
          console.log(false)
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
          console.log(true)
          this.isShowPage = true
          this.axios.all([this.getCount(), this.getData()])
            .then(this.axios.spread((acct, perms) => {
              if (perms.data.code === '404' || acct.data.code === '404') {
                this.$router.push('./404')
              } else if (perms.data.code === '1024' || acct.data.code === '1024') {
                this.fundData = []
                this.loading = false
                this.$message({message: '请求超时，请增加搜索条件以便搜索', type: 'warning'})
              } else {
                this.count = acct.data[0].count
                this.fundData = perms.data
                this.loading = false
                this.pageContent = 'total, sizes, prev, pager, next, jumper'
              }
            })).catch(() => {
              this.fundData = []
              this.loading = false
              this.$message.error('搜索出现错误，请重试')
            }
          )
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userAddressBook
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
        font-size: 14px
        color: #666
      .managerText
        width: 180px
      .userButton
        margin-left: 5px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
