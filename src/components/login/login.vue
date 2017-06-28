<template>
  <div class="login fillcontain">
    <transition name="form-fade" mode="in-out">
    <section class="form_contianer" v-show="showLogin">
      <div class="manage_tip">
        <p>内容管理系统</p>
      </div>
      <el-form ref="loginForm" class="loginForm">
        <el-form-item prop="username">
          <el-input v-model="name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="jumpTo({path:'/home'})">登陆</el-button>
        </el-form-item>
      </el-form>
    </section>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        name: '',
        password: '',
        showLogin: false
      }
    },
    mounted () {
      this.showLogin = true
    },
    methods: {
      jumpTo (path) {
        console.log(1)
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    background-color: #1d8ce0
    .form_contianer
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 320px
      height:160px
      padding: 25px
      border-radius: 5px
      text-align: center
      background-color: #fff
      &.form-fade-enter-active, &.form-fade-leave-active
        transition: all 1s
      &.form-fade-enter, &.form-fade-leave-active
        transform: translate3d(0, -50px, 0)
        opacity: 0
      .manage_tip
        position: absolute
        width: 100%
        top: -100px
        left: 0
        p
          font-size: 50px
          color :#fff
      .loginForm
        .submit_btn
          width:100%
          color: #fff

</style>
