<template>
  <div class="loanApplicationsList" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">订单号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText"
                  v-model.trim="out_trade_no"></el-input>
      </li>
      <li>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerTextMiddle"
                  v-model.trim="user_phone"></el-input>
      </li>
      <li>
        <span class="managerFrontSpecial">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerTextShort"
                  v-model.trim="realname"></el-input>
      </li>
      <li>
        <span class="managerFront">用户类型：</span>
        <el-select v-model.trim="customer_type" size="small" placeholder="不限" class="loanAppSelect">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <span class="managerFront">状态：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="loanAppSelectLong">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <el-button type="primary" size="small" class="loanAppButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table stripe :data="fundData" highlight-current-row border
              style="width: 100%;overflow: auto" :height="height" class="loanApplicationsList-table">
      <el-table-column property="out_trade_no" label="订单号" width="150px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="money_amount" label="借款金额(元)"></el-table-column>
      <el-table-column property="into_money" label="到账金额(元)"></el-table-column>
      <el-table-column property="loan_term" label="借款期限(天)"></el-table-column>
      <el-table-column property="apr" label="服务费利率(万分之一)" width="130px"></el-table-column>
      <el-table-column property="loan_interests" label="服务费(元)"></el-table-column>
      <el-table-column property="sjloan_urgent_fee" label="加急费(元)"></el-table-column>
      <el-table-column property="order_time" sortable label="申请时间" width="130px"></el-table-column>
      <el-table-column property="verify_loan_time" sortable label="放款时间" width="130px"></el-table-column>
      <el-table-column property="updated_at" sortable label="更新时间" width="130px"></el-table-column>
      <el-table-column property="child_type" label="子类型"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
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
        out_trade_no: '',
        realname: '',
        user_phone: '',
        status: '',
        customer_type: '',
        fundData: [],
        loading: false,
        currentRow: null,
        isShowPage: false,
        pageContent: 'sizes',
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        options1: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '新用户'
        }, {
          value: '1',
          label: '老用户'
        }],
        options2: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '待初审'
        }, {
          value: '-3',
          label: '初审驳回'
        }, {
          value: '1',
          label: '初审通过'
        }, {
          value: '-4',
          label: '复审驳回'
        }, {
          value: '20',
          label: '复审通过,待放款'
        }, {
          value: '-5',
          label: '放款驳回'
        }, {
          value: '22',
          label: '放款中'
        }, {
          value: '-10',
          label: '放款失败'
        }, {
          value: '21',
          label: '已放款，还款中'
        }, {
          value: '23',
          label: '部分还款'
        }, {
          value: '30',
          label: '已还款'
        }, {
          value: '-11',
          label: '已逾期'
        }, {
          value: '-20',
          label: '已坏账'
        }, {
          value: '34',
          label: '逾期已还款'
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
        this.axios.post('/api/loanApplicationsList', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          customer_type: this.customer_type,
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
        return this.axios.post('/api/loanApplicationsList', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          customer_type: this.customer_type,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/loanApplicationsList/count', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          customer_type: this.customer_type
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.out_trade_no === '' && this.realname === '' && this.user_phone === '' && this.status === '' && this.customer_type === '') {
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
  .loanApplicationsList
    height: 100%
    .loanApplicationsList-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        margin-right: 20px
        .managerFront, .managerFrontSpecial
          display: inline-block
          padding-left: 5px
          width: 70px
          font-size: 14px
          color: #666
        .managerFrontSpecial
          /*width: 50px*/
        .managerText
          width: 180px
        .managerTextMiddle
          width: 153px
        .managerTextShort
          width: 120px
        .loanAppButton
          margin-left: 5px
        .loanAppSelect
          width: 180px
        .loanAppSelectLong
          width: 283px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
