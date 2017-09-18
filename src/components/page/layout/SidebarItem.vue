<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown && item.children.length>0"
                   :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <i class="elextra-icon-home"></i>{{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <i v-if='item.icon' :class="item.icon"></i>{{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children && child.children.length>0'
                        :routes='[child]'></sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if='child.icon' :class="child.icon"></i>{{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import $ from 'jquery'

  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    updated () {
      if ($('.elextra-icon-left').length === 0) {
        let icon = $('<i class="toggle elextra-icon-left"></i>')
        $('.sidebar-container>div>a').after(icon)
        $('.toggle').css('position', 'absolute').css('top', '5px').css('right', '-10px').css('font-size', '20px').css('padding', '15px 15px 15px 30px').css('color', '#bfcbd9').css('cursor', 'pointer').on('click', (e) => {
          if ($('.elextra-icon-left').length === 1) {
            $('.toggle').removeClass('elextra-icon-left').addClass('elextra-icon-right')
            this.toggleSideBar(0)
          } else {
            $('.toggle').removeClass('elextra-icon-right').addClass('elextra-icon-left')
            this.toggleSideBar(1)
          }
        })
      }
    },
    methods: {
      toggleSideBar (mark) {
        this.$store.dispatch('ToggleSideBar', mark)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .hideSidebar .menu-indent
    display: block
    text-indent: 10px

  .elextra-icon-home
    position: relative
    top: -2px

  .elextra-icon-repay
    position: relative
    top: -1px
    right: 4px
    font-size: 18px
    margin-right: 7px

  .elextra-icon-promotion
    font-size: 20px;
    margin-right: 4px
    position: relative
    top: -1px
    right: 5px

  .elextra-icon-analysis
    position: relative
    top: -1px
    right: 1px
    font-size: 16px
    margin-right: 8px

  .elextra-icon-finance
    position: relative
    top: -2px
    right: 5px
    font-size: 19px
    margin-right: 5px

  .elextra-icon-user
    position: relative
    top: -2px
    right: 3px
    margin-right: 7px
    font-size: 17px

  .elextra-icon-loan
    position: relative
    right: 2px
    top: -1px

  .elextra-icon-data
    position: relative
    top: -1px
    right: 2px
  .elextra-icon-privilage
    position: relative
    right: 1px
    top: -1px
</style>

