<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="main"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            <el-menu-item index="cashManage">客户信息</el-menu-item>
            <el-menu-item index="fundProduct">基金信息</el-menu-item>
            <el-menu-item index="customTable">自定义表单</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
            <el-menu-item index="addProduct">添加产品</el-menu-item>
            <el-menu-item index="addMember">添加成员</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
            <el-menu-item index="loginCount">登陆记录</el-menu-item>
            <el-menu-item index="statistics">统计图表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
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
