<template>
  <div class="loginCount">
    <banner></banner>
    <keyboard :loginData="loginData"></keyboard>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  import keyboard from '../charts/keyboard/keyboard'
  export default {
    data () {
      return {
        loginData: {
        }
      }
    },
    components: {
      banner,
      keyboard
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
