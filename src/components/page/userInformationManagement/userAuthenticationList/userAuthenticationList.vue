<template>
  <div class="userAuthenticationList" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">用户ID：</span>
      <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
      <span class="managerFront">用户姓名：</span>
      <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      <span class="managerFront">手机号：</span>
      <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto" height="500">
      <el-table-column property="user_id" label="用户ID"></el-table-column>
      <el-table-column property="realname" label="用户姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号" width="120px"></el-table-column>
      <el-table-column property="auth_pay_password" label="支付密码"></el-table-column>
      <el-table-column property="auth_id_number" label="身份认证"></el-table-column>
      <el-table-column property="auth_company" label="工作信息"></el-table-column>
      <el-table-column property="auth_contact" label="紧急联系人"></el-table-column>
      <el-table-column property="auth_card" label="银行卡"></el-table-column>
      <el-table-column property="auth_zm" label="芝麻信用"></el-table-column>
      <el-table-column property="auth_jxl" label="聚信立"></el-table-column>
      <el-table-column property="auth_more" label="认证更多"></el-table-column>
      <el-table-column property="auth_zfb" label="支付宝"></el-table-column>
      <el-table-column property="auth_taobao" label="淘宝"></el-table-column>
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
        realname: '',
        user_phone: '',
        fundData: [],
        loading: false,
        currentRow: null,
        isShowPage: false,
        pageContent: 'sizes',
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
        this.axios.post('/api/userAuthenticationList', {
          id: this.user_id,
          realname: this.realname,
          user_name: this.user_phone,
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
        return this.axios.post('/api/userAuthenticationList', {
          id: this.user_id,
          realname: this.realname,
          user_name: this.user_phone,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/userAuthenticationList/count', {
          id: this.user_id,
          realname: this.realname,
          user_name: this.user_phone
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        console.log()
        console.log()
        if (this.user_id === '' && this.realname === '' && this.user_phone === '') {
          console.log(false)
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
          console.log(true)
          this.isShowPage = true
          this.axios.all([this.getCount(), this.getData()])
            .then(this.axios.spread((acct, perms) => {
              console.log(acct)
              console.log(perms)
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
            this.$message.error('搜索出现错误，请重试')
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userAuthenticationList
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
