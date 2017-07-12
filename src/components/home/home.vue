<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="main"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>用户信息管理</template>
            <keep-alive><el-menu-item index="userList">用户列表</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="userAddressBook">用户通讯录</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="bankCardsList">银行卡列表</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="userNameAuthenticationList">用户实名认证列表</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="userAuthenticationList">用户认证列表</el-menu-item></keep-alive>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>借款管理</template>
            <el-menu-item index="addProduct">添加产品</el-menu-item>
            <el-menu-item index="addMember">添加成员</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>还款管理</template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
            <el-menu-item index="loginCount">登陆记录</el-menu-item>
            <el-menu-item index="statistics">统计图表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>数据分析</template>
            <keep-alive><el-menu-item index="dailyLendingData">每日放款数据</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="dailyRepaymentUnitData">每日还款单位数据</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="daysStageStatistics">21天分期统计</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="dailyRepaymentAmountData">每日还款金额数据</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="overdueRepaymentStatistics">还款逾期统计</el-menu-item></keep-alive>
            <keep-alive><el-menu-item index="fundAnalysis">资金分析</el-menu-item></keep-alive>
            <keep-alive> <el-menu-item index="collectionManagement">催收管理</el-menu-item></keep-alive>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>推广管理</template>
            <el-menu-item index="explain">产品说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
