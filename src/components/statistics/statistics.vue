<template>
  <div class="statistics">
    <banner></banner>
    <mixchart :loginData="loginData"></mixchart>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  import mixchart from '../charts/mixchart/mixchart'
  export default {
    data () {
      return {
        loginData: {
        }
      }
    },
    components: {
      banner,
      mixchart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
