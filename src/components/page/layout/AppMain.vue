<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-main
    box-sizing :border-box
    padding: 10px
</style>
