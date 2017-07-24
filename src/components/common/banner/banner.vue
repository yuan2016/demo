<template>
  <div class="banner">
    <el-breadcrumb separator="/" class="banner_content">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click.stop.prevent="jumpToLogin({path:'/login'})">
      注销<i class="el-icon--right"></i>
    </el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { clearToken } from '../../../utils/storage'

  export default {
    methods: {
      jumpToLogin (path) {
        clearToken()
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .banner
    background-color: #EFF2F7
    height: 60px
    display: flex
    justify-content: space-between
    align-items: center
    padding-left: 20px
    .el-button
      margin-right: 20px
</style>
