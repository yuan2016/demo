<template>
  <div class="banner">
    <el-breadcrumb separator="/" class="banner_content">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown menu-align='start' class="banner-right">
      <img class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">设置</el-dropdown-item>
        <el-dropdown-item command="singout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .banner
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    .banner-right
      .avator
        width: 36px
        height: 36px
        border-radius:50%
        margin-right: 37px
</style>
