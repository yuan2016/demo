<template>
  <div class="visitor">
    <banner></banner>
    <visitor-pie :pieData="pieData"></visitor-pie>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  import visitorPie from '../visitoPie/visitorPie'
  export default {
    data () {
      return {
        pieData: {
          beijing: 5,
          shanghai: 2,
          guangzhou: 3,
          hangzhou: 3,
          qita: 7
        }
      }
    },
    components: {
      banner,
      visitorPie
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
