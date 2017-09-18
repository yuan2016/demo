<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="header">
      <span class="pic-container">
        <img src="../../../../resource/image/logo.png" style="width:160px;height: 50px;">
      </span>
      <el-autocomplete size="small" type="text" placeholder="请输入表名..." class="head-text" v-model.trim="tableName"
                       :fetch-suggestions="querySearch" @select="handleSelect" :icon=icon :on-icon-click="handleClick">
      </el-autocomplete>
      <!--<i @click="clear" class="search-icon elextra-icon-magnifier"></i>-->
      <span class="avatar-container">
        <span class="avatar-container-item" @click="jumpToLogin({path:'/login'})">[注销]</span>
        <span class="avatar-container-item">{{name}}</span>
        <span class="avatar-container-item" @click="handleEdit">
          <i class="elextra-icon-avatar"></i>
        </span>
      </span>
    </div>
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <App-main/>
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShowDetail">
        <div class="detail-wrapper">
          <div class="detial-main">
            <div class="main-header clearfix">
              <span class="avatar">
                <i class="elextra-icon-avatar"></i>
              </span>
              <span class="company-name">上海灿福信息科技发展有限公司</span>
            </div>
            <div class="main-content">
              <el-form :model="ruleForm" :label-position="labelPosition" ref="ruleForm"
                       label-width="50px" class="ruleForm">
                <el-form-item label="姓名:">
                  <el-input size="small" class="form-input" v-model="ruleForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-radio-group v-model="ruleForm.user_sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="部门:">
                  <el-select class="form-input" v-model="ruleForm.department" placeholder="请选择所属部门">
                    <el-option label="总经办" value="总经办"></el-option>
                    <el-option label="财务部" value="财务部"></el-option>
                    <el-option label="商务部" value="商务部"></el-option>
                    <el-option label="招财猫" value="招财猫"></el-option>
                    <el-option label="数据中心" value="数据中心"></el-option>
                    <el-option label="技术中心" value="技术中心"></el-option>
                    <el-option label="电催中心" value="电催中心"></el-option>
                    <el-option label="运营中心" value="运营中心"></el-option>
                    <el-option label="产品中心" value="产品中心"></el-option>
                    <el-option label="机构商务部" value="机构商务部"></el-option>
                    <el-option label="人力行政中心" value="人力行政中心"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱:">
                  <el-input size="small" class="form-input" v-model="ruleForm.user_email"></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                  <el-input size="small" class="form-input" v-model="ruleForm.user_mobile"></el-input>
                </el-form-item>
                <el-form-item class="long-form">
                  <el-button type="primary" size="small" class="layout-button" @click="submitForm('ruleForm')">
                    立即修改
                  </el-button>
                  <el-button type="success" size="small" class="layout-button"
                             @click="jumpTo({path:'/passwordModify'})">
                    修改密码<i class="elextra-icon-toRight"></i>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--<span class="modify-password"><i class="elextra-icon-lock" title="修改密码"></i></span>-->
          </div>
        </div>
        <div class="detail-close">
          <i class="el-icon-close" @click.stop.prevent="closeDetial"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import AppMain from './AppMain'
  import { clearToken, getAvailableTable, clearAvailableTable, getName } from '../../../common/js/storage'
  import $ from 'jquery'
  import tableData from '../../../common/json/tables.json'

  //  const ct = getAvailableTable().split('|')

  export default {
    data () {
      return {
        tableName: '',
        tables: [],
        icon: 'search',
        name: '',
        ruleForm: {
          user_name: '',
          user_sex: '',
          department: '',
          user_email: '',
          user_mobile: ''
        },
        isShowDetail: false,
        labelPosition: 'right'
      }
    },
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    },
    created () {
      this.tables = this.filterTable(tableData.table)
      this.name = getName()
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      }
    },
    watch: {
      tableName: function (val) {
        if (val.trim()) {
          this.icon = 'circle-cross'
        } else {
          this.icon = 'search'
        }
      }
    },
    methods: {
      jumpTo (path) {
        this.$router.push(path)
      },
      handleEdit () {
        this.isShowDetail = !this.isShowDetail
      },
      closeDetial () {
        this.isShowDetail = !this.isShowDetail
      },
      handleClick () {
        if (this.tableName) {
          this.tableName = ''
        }
      },
      querySearch (queryString, cb) {
        let tables = this.tables
        let results = queryString ? tables.filter(this.createFilter(queryString)) : tables
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (table) => {
          return (table.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      jumpToLogin (path) {
        clearToken()
        clearAvailableTable()
        this.$router.push(path)
      },
      handleSelect (item) {
        let address = {}
        address.path = item.address
        if (address) {
          this.$router.push(address)
        }
      },
      filterTable (a) {
        return a.filter(this.deleteTable)
      },
      deleteTable (i) {
        let ct = getAvailableTable().split('|')
        return ct.indexOf(i.value) !== -1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-wrapper
    box-sizing: border-box
    padding-top: 50px
    position: relative
    height: 100%
    width: 100%
    padding-bottom: 50px
    z-index: 2
    .header
      position: relative
      height: 50px
      margin-top: -50px
      background-color: #324157
      .pic-container
        padding-left: 15px
      .head-text
        position: absolute
        top: 10px
        left: 230px
        display: inline-block
        width: 200px
      .search-icon
        display: inline-block
        position: absolute
        top: 15px
        left: 400px
        font-size: 20px
        color: #c4c4c4
      .avatar-container
        position: absolute
        right: -28px
        top: 15px
        width: 200px
        height: 20px
        font-size: 14px
        color: #ffffff
        .avatar-container-item
          display: inline-block
          margin-left: 15px
          cursor: pointer
          &:first-child
            color: rgb(32, 160, 255)
        .elextra-icon-avatar
          position: absolute
          top: 0
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
        padding: 10px
    .sidebar-wrapper
      width: 230px
      position: fixed
      top: 50px
      bottom: 0
      left: -1px
      border-top: 1px solid rgba(50, 65, 87, 0.9)
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
      transition: all .28s ease-out
      margin-left: 230px
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1002
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active
        transition: all .4s linear
      &.fade-leave-active
        opacity: 0
        transition: all .4s linear
      &.fade-enter
        opacity: 0
      &.fade-leave
        opacity: 1
      .detail-wrapper
        min-height: 100%
        width: 100%
        color: rgb(255, 255, 255)
        .detial-main
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          width: 400px
          height: 570px
          border-radius: 5px
          text-align: left
          background-color: #fff
          .main-header
            box-sizing: border-box
            border: 1px solid #328cc3
            border-radius: 4px 4px 0 0
            width: 100%
            height: 100px
            background-color: rgb(50, 140, 195)
            padding-top: 20px
            .avatar
              position: relative
              left: -25px
              top: -10px
              display: inline-block
              float: left
              box-sizing: border-box
              width: 150px
              height: 100%
              text-align: center
              .elextra-icon-avatar
                display: inline-block
                width: 70px
                height: 70px
                color: #1f2d3d
                font-size: 50px
                line-height: 70px
                border: 3px solid #bfcbd9
                border-radius: 50%
                background-color: #fff
            .company-name
              display: inline-block
              width: 300px
              height: 100%
              padding-left: 17px
              line-height: 50px
              margin-left: -70px
              font-size: 20px
              color: #ffffff
          .main-content
            padding: 30px 20px 0 40px
            .ruleForm
              display: inline-block
              margin-right: 60px
              width: 150px
              .form-input
                width: 220px
              .long-form
                width: 300px
                .layout-button
                  position: relative
                  width: 103px
                  .elextra-icon-toRight
                    position :absolute
                    right: -6px
                    top: 4px
                    font-size: 17px
                    color: #ffffff
          .elextra-icon-lock
            display: inline-block
            position: absolute
            top: 65px
            right: 15px
            padding: 3px
            font-size: 30px
            .elextra-icon-lock
              display: inline-block
              margin-right: 5px
      .detail-close
        position: absolute
        top: 50px
        right: 150px
        padding-top: 16px
        width: 32px
        height: 32px
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)

</style>
