<template>
  <div class="main" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <!--<user-statistics></user-statistics>-->
    <!--<lending-statistics></lending-statistics>-->
    <!--<risk-control-statistics></risk-control-statistics>-->
    <div class="mainContent">
      <div class="title">用户统计</div>
      <el-row class="userStatistics">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <ul class="userStatisticsLeft">
            <li>
              <div class="userLeft">总用户数:</div>
              <div class="userMiddle">{{fundData.total_user_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">全要素认证用户数:</div>
              <div class="userMiddle">{{fundData.all_fact_authuser_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">绑卡用户总数:</div>
              <div class="userMiddle">{{fundData.card_bounduser_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">运营商认证总数:</div>
              <div class="userMiddle">{{fundData.total_operauth_num}}</div>
              <div class="userRight">人</div>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <ul class="userStatisticsRight">
            <li>
              <div class="userLeft">今日注册用户数:</div>
              <div class="userMiddle">{{fundData.today_registuser_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">实名认证用户总数:</div>
              <div class="userMiddle">{{fundData.total_realnameauth_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">芝麻认证用户总数:</div>
              <div class="userMiddle">{{fundData.total_Sesameauth_num}}</div>
              <div class="userRight">人</div>
            </li>
            <li>
              <div class="userLeft">紧急联系人认证总数:</div>
              <div class="userMiddle">{{fundData.total_emergcontact_num}}</div>
              <div class="userRight">人</div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <div class="title">放款统计</div>
      <el-row class="lendingStatistics">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <ul class="userStatisticsLeft">
            <li>
              <div class="userLeft">累计放款金额:</div>
              <div class="userMiddle">{{fundData.accu_loan_amount}}</div>
              <div class="userRight">元</div>
            </li>
            <li>
              <div class="userLeft">当日放款金额:</div>
              <div class="userMiddle">{{fundData.today_loan_amount}}</div>
              <div class="userRight">元</div>
            </li>
            <li>
              <div class="userLeft">放款中总金额:</div>
              <div class="userMiddle">{{fundData.total_inloan_amount}}</div>
              <div class="userRight">元</div>
            </li>
            <li>
              <div class="userLeft">放款失败金额:</div>
              <div class="userMiddle">{{fundData.Loanfail_amount}}</div>
              <div class="userRight">元</div>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <ul class="userStatisticsRight">
            <li>
              <div class="userLeft">累计放款笔数:</div>
              <div class="userMiddle">{{fundData.accu_loan_num}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">当日放款笔数:</div>
              <div class="userMiddle">{{fundData.today_loan_num}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">放款中笔数:</div>
              <div class="userMiddle">{{fundData.total_inloan_num}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">放款失败笔数:</div>
              <div class="userMiddle">{{fundData.Loanfail_num}}</div>
              <div class="userRight">笔</div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <div class="title">风控统计</div>
      <el-row class="riskControlStatistics">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <ul class="riskControlStatisticsLeft">
            <li>
              <div class="userLeft">机审累计订单数:</div>
              <div class="userMiddle">{{fundData.accu_machinetrial_order}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日机审订单数:</div>
              <div class="userMiddle">{{fundData.today_machinetrial_order}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日老用户已审:</div>
              <div class="userMiddle">{{fundData.today_olduser_trial}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日新用户已审:</div>
              <div class="userMiddle">{{fundData.today_newuser_trial}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">待信审用户数:</div>
              <div class="userMiddle">{{fundData.Pendingtrial_user_num}}</div>
              <div class="userRight">人</div>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="9" :lg="9">
          <ul class="riskControlStatisticsMiddle">
            <li>
              <div class="userLeft">机审通过累计订单数:</div>
              <div class="userMiddle">{{fundData.accu_passmachtrial_order}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日机审通过订单数:</div>
              <div class="userMiddle">{{fundData.today_passmachtrial_order}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日老用户通过:</div>
              <div class="userMiddle">{{fundData.today_ouserpass_num}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">今日新用户通过:</div>
              <div class="userMiddle">{{fundData.today_nuserpass_num}}</div>
              <div class="userRight">笔</div>
            </li>
            <li>
              <div class="userLeft">待机审订单数:</div>
              <div class="userMiddle">{{fundData.Pendingtrial_order_num}}</div>
              <div class="userRight">笔</div>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="7" :lg="7">
          <ul class="riskControlStatisticsRight">
            <li>
              <div class="userLeft">机审订单通过率:</div>
              <div class="userMiddle">{{fundData.passmachtrial_order_rate}}</div>
              <div class="userRight">%</div>
            </li>
            <li>
              <div class="userLeft">今日机审通过率:</div>
              <div class="userMiddle">{{fundData.today_passmachtrial_rate}}</div>
              <div class="userRight">%</div>
            </li>
            <li>
              <div class="userLeft">今日老用户通过率:</div>
              <div class="userMiddle">{{fundData.today_ouserpass_rate}}</div>
              <div class="userRight">%</div>
            </li>
            <li>
              <div class="userLeft">今日新用户通过率:</div>
              <div class="userMiddle">{{fundData.today_nuserpass_rate}}</div>
              <div class="userRight">%</div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <!--<div class="footer"><span class="copyright">@copyright上海灿福信息科技发展有限公司</span></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../common/banner/banner'
  import { getHeight } from '../../../common/js/storage'
  import ElRow from '../../../../node_modules/element-ui/packages/row/src/row'

  export default {
    data () {
      return {
        fundData: {
          total_user_num: ''
        },
        dHeight: 500
      }
    },
    created () {
      this.getData()
    },
    mounted () {
      this.resizeHeight()
    },
    methods: {
      getData () {
        this.axios.post('/api/main').then((response) => {
          if (response.data[0].code === '404') {
            this.$router.push('./404')
          } else if (response.data[0].code === '1024') {
            this.fundData = []
            this.$message({
              message: '请求超时，请增加搜索条件以便搜索',
              type: 'warning'
            })
          } else {
            this.fundData = response.data[0]
          }
        }).catch(() => {
          this.fundData = []
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
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
        this.height = docH - filterH - bannerH - pageH - 85
        /*90+20*/
        this.dHeight = docH - 90
      }
    },
    components: {
      ElRow,
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main
    height: 100%
    overflow: auto
    padding-right: 5px
    .mainContent
      height: 93%
      .title
        display: inline-block
        line-height: 36px
        font-size: 20px
        border-bottom: 3px solid #20A0FF
      .userStatistics, .lendingStatistics, .riskControlStatistics
        padding: 0.5% 20px
        margin-bottom: 2%
        font-size: 0px
        border: 1px solid #ccc
        border-radius: 3px
        .userStatisticsLeft, .userStatisticsRight
          font-size: 13px
          li
            margin-bottom: 2px
            .userLeft
              display: inline-block
              width: 30%
              min-width: 121px
              color: #666
              line-height: 40px
              background-color: #F6F6F6
              text-align: right
            .userMiddle
              display: inline-block
              padding-left: 5px
              width: 38%
              line-height: 40px
              color: #000
              font-weight: bold
              background-color: #E9E9E9
            .userRight
              display: inline-block
              width: 20%
              color: #666
              line-height: 40px
              text-align: center
              background-color: #F6F6F6
        .riskControlStatisticsLeft, .riskControlStatisticsMiddle, .riskControlStatisticsRight
          font-size: 13px
          li
            margin-bottom: 2px
            .userLeft
              display: inline-block
              width: 45%
              min-width: 121px
              color: #666
              line-height: 40px
              background-color: #F6F6F6
              text-align: right
            .userMiddle
              display: inline-block
              padding-left: 5px
              width: 31%
              line-height: 40px
              color: #000
              font-weight: bold
              background-color: #E9E9E9
            .userRight
              display: inline-block
              width: 13%
              color: #666
              line-height: 40px
              text-align: center
              background-color: #F6F6F6

      .riskControlStatistics
        margin-bottom: 0
        .el-col
          &:first-of-type
            .userLeft
              min-width: 110px
          &:last-of-type
            .userMiddle
              @media (min-width: 993px)
                width: 20%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold

  @media (max-width: 992px)
    .main
      min-width: 370px
      .mainContent
        .riskControlStatistics
          .riskControlStatisticsLeft, .riskControlStatisticsMiddle, .riskControlStatisticsRight
            li
              .userLeft
                width: 30%
              .userMiddle
                width: 38%
              .userRight
                width: 20%
          .el-col
            &:first-of-type
              .userLeft
                min-width: 121px

</style>
