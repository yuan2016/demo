<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <App-main/>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import AppMain from './AppMain'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-wrapper
    position: relative
    height: 100%
    width: 100%
    &.hideSidebar
      .sidebar-wrapper
        transform: translate(-200px, 0)
        .sidebar-container
          transform: translate(190px, 0)
        &:hover
          transform: translate(0, 0)
          .sidebar-container
            transform: translate(0, 0)
      .main-container
        margin-left: 30px
    .sidebar-wrapper
      width: 230px
      position: fixed
      top: 0
      bottom: 0
      left: 0
      z-index: 1001
      overflow: hidden
      transition: all .28s ease-out
      .sidebar-container
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: -10px
        overflow-y: scroll
        transition: all .28s ease-out
    .main-container
      min-height: 100%
      transition: all .28s ease-out
      margin-left: 230px

</style>
