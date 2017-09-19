<template>
  <div class="raiseQuotaRecord" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">用户ID：</span>
        <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
      </li>
      <li>
        <span class="managerFront">姓名：</span>
        <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      </li>
      <li>
        <span class="managerFront">手机号：</span>
        <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      </li>
      <li>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto;" :height="height" class="raiseQuotaRecord-table">
      <el-table-column property="user_id" label="用户ID" width="70"></el-table-column>
      <el-table-column property="realname" label="姓名" width="70"></el-table-column>
      <el-table-column property="user_phone" label="手机号" width="100"></el-table-column>
      <el-table-column property="new_amount_max" label="提额后总额度(元)" width="130"></el-table-column>
      <el-table-column property="add_amount" label="本次提升额度(元)" width="120"></el-table-column>
      <el-table-column property="repayment_succ_count" label="成功还款次数"></el-table-column>
      <el-table-column property="repayment_norm_count" label="正常还款次数"></el-table-column>
      <el-table-column property="repayment_succ_amount" label="成功还款金额(元)" width="110"></el-table-column>
      <el-table-column property="repayment_norm_amount" label="正常还款金额(元)" width="110"></el-table-column>
      <el-table-column property="last_apply_at" sortable label="上次提额时间" width="120"></el-table-column>
      <el-table-column property="create_at" sortable label="创建时间" width="130"></el-table-column>
      <el-table-column property="updated_at" sortable label="更新时间" width="130"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="audit_user" label="操作人"></el-table-column>
      <el-table-column property="remark" label="备注" width="230px"></el-table-column>
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

  export default {
    data () {
      return {
        user_id: '',
        realname: '',
        user_phone: '',
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
        this.axios.post('/api/raiseQuotaRecord', {
          user_id: this.user_id,
          realname: this.realname,
          user_phone: this.user_phone,
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
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData () {
        return this.axios.post('/api/raiseQuotaRecord', {
          user_id: this.user_id,
          realname: this.realname,
          user_phone: this.user_phone,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/raiseQuotaRecord/count', {
          user_id: this.user_id,
          realname: this.realname,
          user_phone: this.user_phone
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .raiseQuotaRecord
    height: 100%
    .raiseQuotaRecord-table
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
          width: 56px
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
