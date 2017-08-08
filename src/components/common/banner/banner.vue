<template>
  <div class="banner">
    <el-breadcrumb separator="/" class="banner_content">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown split-button type="primary">
      更多
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="jumpTopwd({path:'/passwordModify'})">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="jumpToLogin({path:'/login'})">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
  import { clearToken } from '../../../common/js/storage'

  export default {
    methods: {
      jumpToLogin (path) {
        clearToken()
        this.$router.push(path)
      },
      jumpTopwd (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .banner
    display: flex
    height: 60px
    box-sizing :border-box
    background-color: #EFF2F7
    justify-content: space-between
    align-items: center
    padding-left: 20px
    .el-button
      margin-right: 20px
</style>
