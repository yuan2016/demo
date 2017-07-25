<template>
  <div class="main">
    <banner></banner>
    <!--<user-statistics></user-statistics>-->
    <!--<lending-statistics></lending-statistics>-->
    <!--<risk-control-statistics></risk-control-statistics>-->
    <div class="mainContent">
      <div class="title">用户统计</div>
      <div class="userStatistics">
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
      </div>
      <div class="title">放款统计</div>
      <div class="lendingStatistics">
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
      </div>
      <div class="title">风控统计</div>
      <div class="riskControlStatistics">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../common/banner/banner'

  export default {
    data () {
      return {
        fundData: {
          total_user_num: ''
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.axios.post('/api/main').then((response) => {
          this.fundData = response.data[0]
        })
      }
    },
    components: {
      banner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mainContent
    padding: 10px
    .title
      display: inline-block
      font-size: 20px
      border-bottom: 3px solid #20A0FF
    .userStatistics, .lendingStatistics, .riskControlStatistics
      display: flex
      padding: 20px
      margin-bottom: 30px
      font-size: 0px
      border: 1px solid #ccc
      border-radius: 3px
      .userStatisticsLeft, .userStatisticsRight
        flex: 1
        li
          margin-bottom: 2px
          .userLeft
            display: inline-block
            width: 150px
            color: #666
            font-size: 15px
            line-height: 40px
            background-color: #F6F6F6
            text-align: right
          .userMiddle
            display: inline-block
            padding-left: 5px
            width: 200px
            font-size: 15px
            line-height: 40px
            color: #000
            font-weight: bold
            background-color: #E9E9E9
          .userRight
            display: inline-block
            width: 100px
            color: #666
            font-size: 15px
            line-height: 40px
            text-align: center
            background-color: #F6F6F6
      .riskControlStatisticsLeft, .riskControlStatisticsMiddle, .riskControlStatisticsRight
        flex: 1
        li
          margin-bottom: 2px
          .userLeft
            display: inline-block
            width: 150px
            color: #666
            font-size: 15px
            line-height: 40px
            background-color: #F6F6F6
            text-align: right
          .userMiddle
            display: inline-block
            padding-left: 5px
            width: 110px
            font-size: 15px
            line-height: 40px
            color: #000
            font-weight: bold
            background-color: #E9E9E9
          .userRight
            display: inline-block
            width: 70px
            color: #666
            font-size: 15px
            line-height: 40px
            text-align: center
            background-color: #F6F6F6

  .el-col-4
    width: 15.66667%

  .el-col-20
    width: 84.33333%

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
