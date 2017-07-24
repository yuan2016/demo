<template>
  <div class="login fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>报表系统</p>
        </div>
        <el-form ref="loginForm" class="loginForm" :rules="loginRules" :model="loginForm">
          <el-form-item prop="email">
            <el-input type="text" placeholder="邮箱" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" :loading="loading" @click="jumpTo({path:'/home'})">登陆
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { saveToken } from '../../utils/storage'
  import { isCfEmail } from '../../utils/validate'

  export default {
    data () {
      const validateEmail = (rule, value, callback) => {
        if (!isCfEmail(value)) {
          callback(new Error('请输入正确的合法邮箱'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          email: '',
          password: ''
        },
        showLogin: false,
        loading: false,
        loginRules: {
          email: [
            {required: true, trigger: 'blur', validator: validateEmail}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        }
      }
    },
    mounted () {
      this.showLogin = true
    },
    methods: {
      jumpTo (path) {
        this.$router.push(path)
        this.axios.post('/api/login', this.loginForm).then((response) => {
          if (response.data === 400) {
            this.$message({
              message: '用户不存在',
              type: 'warning'
            })
          } else if (response.data === 300) {
            this.$message.error('密码错误')
          } else {
            this.$message({
              message: '欢迎进入报表系统',
              type: 'success'
            })
            saveToken(response.data)
            this.$router.push(path)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    background-image: url(../../../resource/image/background.jpg)
    background-size: cover
    .form_contianer
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 320px
      height: 160px
      padding: 25px
      border-radius: 5px
      text-align: center
      background-color: #fff
      &.form-fade-enter-active, &.form-fade-leave-active
        transition: all 1s
      &.form-fade-enter, &.form-fade-leave-active
        transform: translate3d(-1000px, -1000px, 0)
        opacity: 0
      .manage_tip
        position: absolute
        width: 100%
        top: -100px
        left: 0
        p
          font-size: 50px
          color: #fff
      .loginForm
        .submit_btn
          width: 100%
          color: #fff
</style>
