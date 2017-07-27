<template>
  <div class="app-wrapper">
    <div class="sidebar-wrapper">
      <el-menu class="sidebar-container" unique-opened :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
        <el-menu-item index="main"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-document"></i>用户信息管理</template>
          <keep-alive>
            <el-menu-item index="userList"><i class="el-icon-star-on"></i>用户列表</el-menu-item>
          </keep-alive>
          <keep-alive>
            <el-menu-item index="userAddressBook"><i class="el-icon-star-on"></i>用户通讯录</el-menu-item>
          </keep-alive>
          <keep-alive>
            <el-menu-item index="bankCardsList"><i class="el-icon-star-on"></i>银行卡列表</el-menu-item>
          </keep-alive>
          <keep-alive>
            <el-menu-item index="userNameAuthenticationList"><i class="el-icon-star-on"></i>用户实名认证列表</el-menu-item>
          </keep-alive>
          <keep-alive>
            <el-menu-item index="userAuthenticationList"><i class="el-icon-star-on"></i>用户认证列表</el-menu-item>
          </keep-alive>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-plus"></i>借款管理</template>
          <el-menu-item index="loanApplicationsList"><i class="el-icon-star-on"></i>借款申请列表</el-menu-item>
          <el-menu-item index="loanAuditList"><i class="el-icon-star-on"></i>放款审核列表</el-menu-item>
          <el-menu-item index="raiseQuotaRecord"><i class="el-icon-star-on"></i>提额记录表</el-menu-item>
          <el-menu-item index="reconciliationFunction"><i class="el-icon-star-on"></i>对账功能</el-menu-item>
          <el-menu-item index="assetInformation"><i class="el-icon-star-on"></i>资产信息-招财猫</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-time"></i>还款管理</template>
          <el-submenu index="3-1">
            <template slot="title"><i class="el-icon-star-on"></i>还款列表</template>
            <el-menu-item index="waitingForReturnList"><i class="el-icon-star-off"></i>待还列表</el-menu-item>
            <el-menu-item index="returnedList"><i class="el-icon-star-off"></i>已还列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3-2">
            <template slot="title"><i class="el-icon-star-on"></i>对账列表</template>
            <el-menu-item index="repaymentReconciliation"><i class="el-icon-star-off"></i>还款对账</el-menu-item>
            <el-menu-item index="renewalReconciliation"><i class="el-icon-star-off"></i>续期对账</el-menu-item>
          </el-submenu>
          <el-submenu index="3-3">
            <template slot="title"><i class="el-icon-star-on"></i>退款列表</template>
            <el-menu-item index="repaymentDetails"><i class="el-icon-star-off"></i>还款详情</el-menu-item>
            <el-menu-item index="renewalParticulars"><i class="el-icon-star-off"></i>续期详情</el-menu-item>
            <el-menu-item index="rebackedList"><i class="el-icon-star-off"></i>已退列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3-4">
            <template slot="title"><i class="el-icon-star-on"></i>续期管理</template>
            <el-menu-item index="renewalsList"><i class="el-icon-star-off"></i>续期列表</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>数据分析</template>
          <el-submenu index="4-1">
            <template slot="title"><i class="el-icon-star-on"></i>财务数据</template>
            <el-menu-item index="dailyLendingData"><i class="el-icon-star-off"></i>每日放款数据</el-menu-item>
            <el-menu-item index="dailyRepaymentUnitData"><i class="el-icon-star-off"></i>每日还款单位数据</el-menu-item>
            <el-menu-item index="daysStageStatistics"><i class="el-icon-star-off"></i>21天分期统计</el-menu-item>
            <el-menu-item index="dailyRepaymentAmountData"><i class="el-icon-star-off"></i>每日还款金额数据</el-menu-item>
            <el-menu-item index="overdueRepaymentStatistics"><i class="el-icon-star-off"></i>还款逾期统计</el-menu-item>
            <el-menu-item index="fundAnalysis"><i class="el-icon-star-off"></i>资金分析</el-menu-item>
            <el-menu-item index="collectionManagement"><i class="el-icon-star-off"></i>催收管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4-2">
            <template slot="title"><i class="el-icon-star-on"></i>数据报表</template>
            <el-menu-item index="platformData"><i class="el-icon-star-off"></i>平台数据</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-warning"></i>推广管理</template>
          <el-menu-item index="promotionChannel"><i class="el-icon-star-on"></i>推广渠道</el-menu-item>
          <el-menu-item index="promoterManagement"><i class="el-icon-star-on"></i>推广员管理</el-menu-item>
          <el-menu-item index="promotionChannelStatistics"><i class="el-icon-star-on"></i>推广统计(渠道)</el-menu-item>
          <el-menu-item index="promotionRegionStatistics"><i class="el-icon-star-on"></i>推广统计(地区)</el-menu-item>
          <el-menu-item index="channelStatisticsSummary"><i class="el-icon-star-on"></i>渠道统计汇总</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElSubmenu from '../../../node_modules/element-ui/packages/menu/src/submenu'

  export default {
    components: {ElSubmenu},
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-wrapper
    position: relative
    height: 100%
    width: 100%
    .sidebar-wrapper
      width: 230px
      position: fixed
      top: 0
      bottom: 0
      left: 0
      z-index: 1001
      overflow: hidden
      .sidebar-container
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: -10px
        overflow-y: scroll
    .main-container
      min-height: 100%
      margin-left: 230px

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
