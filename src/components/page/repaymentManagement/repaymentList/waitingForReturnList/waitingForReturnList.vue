<template>
  <div class="waitingForReturnList" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">姓名：</span>
        <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
      </li>
     <li>
       <span class="managerFront">手机号：</span>
       <el-input type="text" size="small" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
     </li>
      <li>
        <span class="managerFront">状态：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="watingSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <el-button type="primary" size="small" class="watingButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </div>
    <el-table :data="fundData" class="waitingForReturnList-table"
              highlight-current-row border stripe style="width: 100%;overflow: auto" :height="height">
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="repayment_principal" label="借款到账金额(元)"></el-table-column>
      <el-table-column property="repayment_interest" label="服务费(元)"></el-table-column>
      <el-table-column property="repayment_amount" label="需还款总金额(元)"></el-table-column>
      <el-table-column property="repaymented_amount" label="已还金额(元)"></el-table-column>
      <el-table-column property="credit_repayment_time" sortable label="放款时间" width="130px"></el-table-column>
      <el-table-column property="repayment_time" sortable label="到期日期" width="130px"></el-table-column>
      <el-table-column property="late_day" label="逾期天数"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="is_fenqi" label="是否分期"></el-table-column>
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
  import banner from '../../../../common/banner/banner'

  export default {
    data () {
      return {
        realname: '',
        user_phone: '',
        status: '',
        fundData: [],
        loading: false,
        isShowPage: false,
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '21',
          label: '已放款/待还款'
        }, {
          value: '23',
          label: '部分还款'
        }, {
          value: '-11',
          label: '已逾期'
        }, {
          value: '-20',
          label: '已坏账'
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
      getDataInit () {
        this.axios.post('/api/waitingForReturnList', {
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
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
        return this.axios.post('/api/waitingForReturnList', {
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/waitingForReturnList/count', {
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.realname === '' && this.user_phone === '' && this.status === '') {
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
      resizeHeight  () {
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
  .waitingForReturnList
    height: 100%
    .waitingForReturnList-table
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
          padding-left: 5px
          font-size: 14px
          color: #666
        .managerText
          width: 180px
        .watingButton
          margin-left: 5px
        .watingSelect
          width: 130px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px
a
    .el-table th > .cell
      text-align: center
      font-weight: bold

  @media (max-width: 768px)
    .date-filter
      li
        .managerFront
          display:inline-block
          width: 66px

</style>
