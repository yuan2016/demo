<template>
  <div class="employeeList" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">姓名：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_name"
                @keyup.enter.native="search"></el-input>
      <span class="managerFront">手机号：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_mobile"
                @keyup.enter.native="search"></el-input>
      <span class="managerFront">邮箱：</span>
      <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_email"
                @keyup.enter.native="search"></el-input>
      <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe style="width: 100%;overflow: auto" :height="height" class="employeeList-table">
      <el-table-column property="user_name" label="姓名"></el-table-column>
      <el-table-column property="user_sex" label="性别"></el-table-column>
      <el-table-column property="department" label="部门"></el-table-column>
      <el-table-column property="user_mobile" label="手机号"></el-table-column>
      <el-table-column property="user_email" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <!--<el-button-->
          <!--size="small"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        :layout="pageContent"
        :total="count">
      </el-pagination>
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
                  <el-input :disabled="true" size="small" class="form-input" v-model="ruleForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-radio-group disabled v-model="ruleForm.user_sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="部门:">
                  <el-select :disabled="true" class="form-input" v-model="ruleForm.department" placeholder="请选择所属部门">
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
                  <el-input :disabled="true" size="small" class="form-input" v-model="ruleForm.user_email"></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                  <el-input :disabled="true" size="small" class="form-input" v-model="ruleForm.user_mobile"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" class="employeeList-button" @click="submitForm('ruleForm')">
                    立即修改
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="employeeList-tree">
                <el-tree
                  :data="availableTable"
                  show-checkbox
                  node-key="label"
                  ref="tree"
                  highlight-current
                  :props="defaultProps">
                </el-tree>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="el-icon-close" @click.stop.prevent="closeDetial"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'

  const parentTable = ['RMAB', '市场', '运营', '催收', '用户画像', '用户信息管理', '借款管理', '还款管理', '还款列表', '对账列表', '退款列表', '续期管理', '数据分析', '财务数据', '数据报表', '财务分析', '推广管理', '权限管理']
  let temp

  export default {
    data () {
      return {
//        currentTables: [],
        availableTable: [{
          id: 1,
          label: 'RMAB',
          children: [{
            id: 9,
            label: '市场',
            mark: ['市场', 'RMAB'],
            children: [{
              id: 39,
              label: '新用户借款通过率',
              mark: ['新用户借款通过率', '市场', 'RMAB']
            }]
          }, {
            id: 10,
            label: '运营',
            children: [{
              id: 40,
              label: '邀请活动',
              mark: ['邀请活动', '运营', 'RMAB']
            }]
          }, {
            id: 11,
            label: '催收',
            children: [{
              id: 41,
              label: '借款逾期催回率',
              mark: ['借款逾期催回率', '催收', 'RMAB']
            }]
          }, {
            id: 12,
            label: '用户画像',
            children: [{
              id: 42,
              label: '基础用户画像',
              mark: ['基础用户画像', '用户画像', 'RMAB']
            }]
          }]
        }, {
          id: 2,
          label: '用户信息管理',
          children: [{
            id: 13,
            label: '用户列表',
            mark: ['用户列表', '用户信息管理']
          }, {
            id: 14,
            label: '用户通讯录',
            mark: ['用户通讯录', '用户信息管理']
          }, {
            id: 15,
            label: '银行卡列表',
            mark: ['银行卡列表', '用户信息管理']
          }, {
            id: 16,
            label: '用户实名认证列表',
            mark: ['用户实名认证列表', '用户信息管理']
          }, {
            id: 17,
            label: '用户认证列表',
            mark: ['用户认证列表', '用户信息管理']
          }]
        }, {
          id: 3,
          label: '借款管理',
          children: [{
            id: 18,
            label: '借款申请列表',
            mark: ['借款申请列表', '借款管理']
          }, {
            id: 19,
            label: '放款审核列表',
            mark: ['放款审核列表', '借款管理']
          }, {
            id: 20,
            label: '提额记录表',
            mark: ['提额记录表', '借款管理']
          }, {
            id: 21,
            label: '对账功能',
            mark: ['对账功能', '借款管理']
          }, {
            id: 22,
            label: '资产信息-招财猫',
            mark: ['资产信息-招财猫', '借款管理']
          }]
        }, {
          id: 4,
          label: '还款管理',
          children: [{
            id: 23,
            label: '还款列表',
            mark: ['还款列表', '还款管理'],
            children: [{
              id: 43,
              label: '待还列表',
              mark: ['待还列表', '还款列表', '还款管理']
            }, {
              id: 44,
              label: '已还列表',
              mark: ['已还列表', '还款列表', '还款管理']
            }]
          }, {
            id: 24,
            label: '对账列表',
            mark: ['对账列表', '还款管理'],
            children: [{
              id: 45,
              label: '还款对账',
              mark: ['还款对账', '对账列表', '还款管理']
            }, {
              id: 46,
              label: '续期对账',
              mark: ['续期对账', '对账列表', '还款管理']
            }]
          }, {
            id: 25,
            label: '退款列表',
            mark: ['退款列表', '还款管理'],
            children: [{
              id: 47,
              label: '还款详情',
              mark: ['还款详情', '退款列表', '还款管理']
            }, {
              id: 48,
              label: '续期详情',
              mark: ['续期详情', '退款列表', '还款管理']
            }, {
              id: 49,
              label: '已退列表',
              mark: ['已退列表', '退款列表', '还款管理']
            }]
          }, {
            id: 26,
            label: '续期管理',
            mark: ['续期管理', '还款管理'],
            children: [{
              id: 50,
              label: '续期列表',
              mark: ['续期列表', '续期管理', '还款管理']
            }]
          }]
        }, {
          id: 5,
          label: '数据分析',
          children: [{
            id: 27,
            label: '财务数据',
            mark: ['财务数据', '数据分析'],
            children: [{
              id: 51,
              label: '每日放款数据',
              mark: ['每日放款数据', '财务数据', '数据分析']
            }, {
              id: 52,
              label: '21天分期统计',
              mark: ['21天分期统计', '财务数据', '数据分析']
            }, {
              id: 53,
              label: '21天分期提额统计',
              mark: ['21天分期提额统计', '财务数据', '数据分析']
            }, {
              id: 54,
              label: '90天分期统计',
              mark: ['90天分期统计', '财务数据', '数据分析']
            }, {
              id: 61,
              label: '每日还款单位数据',
              mark: ['每日还款单位数据', '财务数据', '数据分析']
            }, {
              id: 55,
              label: '每日还款金额数据',
              mark: ['每日还款金额数据', '财务数据', '数据分析']
            }, {
              id: 56,
              label: '还款逾期统计',
              mark: ['还款逾期统计', '财务数据', '数据分析']
            }, {
              id: 57,
              label: '资金分析',
              mark: ['资金分析', '财务数据', '数据分析']
            }, {
              id: 58,
              label: '资金分析(分产品)',
              mark: ['资金分析(分产品)', '财务数据', '数据分析']
            }, {
              id: 59,
              label: '催收管理',
              mark: ['催收管理', '财务数据', '数据分析']
            }, {
              id: 60,
              label: '在催金额',
              mark: ['在催金额', '财务数据', '数据分析']
            }]
          }, {
            id: 28,
            label: '数据报表',
            mark: ['数据报表', '数据分析'],
            children: [{
              id: 62,
              label: '平台数据',
              mark: ['平台数据', '数据报表', '数据分析']
            }]
          }]
        }, {
          id: 6,
          label: '财务分析',
          children: [{
            id: 29,
            label: '还款明细',
            mark: ['还款明细', '财务分析']
          }, {
            id: 30,
            label: '对账分析',
            mark: ['对账分析', '财务分析']
          }, {
            id: 31,
            label: '还款日报',
            mark: ['还款日报', '财务分析']
          }]
        }, {
          id: 7,
          label: '推广管理',
          children: [{
            id: 32,
            label: '推广渠道',
            mark: ['推广渠道', '推广管理']
          }, {
            id: 33,
            label: '推广员管理',
            mark: ['推广员管理', '推广管理']
          }, {
            id: 34,
            label: '推广统计(渠道)',
            mark: ['推广统计(渠道)', '推广管理']
          }, {
            id: 35,
            label: '推广统计(地区)',
            mark: ['推广统计(地区)', '推广管理']
          }, {
            id: 36,
            label: '渠道统计汇总',
            mark: ['渠道统计汇总', '推广管理']
          }, {
            id: 37,
            label: '注册量统计报表',
            mark: ['注册量统计报表', '推广管理']
          }, {
            id: 63,
            label: '贷款超市-PVUV',
            mark: ['贷款超市-PVUV', '推广管理']
          }]
        }, {
          id: 8,
          label: '权限管理',
          children: [{
            id: 38,
            label: '员工信息',
            mark: ['员工信息', '权限管理']
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        labelPosition: 'right',
        user_name: '',
        user_mobile: '',
        user_email: '',
        fundData: [],
        loading: false,
        pageContent: 'sizes',
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        height: 500,
        buttonLoading: false,
        ruleForm: {
          user_name: '',
          user_sex: '',
          department: '',
          user_email: '',
          user_mobile: ''
        },
        isShowDetail: false
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
      this.height = parseInt(getHeight()) + 40
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getDataInit()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getDataInit()
      },
      getDataInit () {
        this.axios.all([this.getCount(), this.getData()])
          .then(this.axios.spread((acct, perms) => {
            if (perms.data.code === '404' || acct.data.code === '404') {
              this.$router.push('./404')
            } else if (perms.data.code === '1024' || acct.data.code === '1024') {
              this.fundData = []
              this.loading = false
              this.$message({
                message: '请求超时，请增加搜索条件以便搜索',
                type: 'warning'
              })
            } else {
              this.count = acct.data[0].count
              this.fundData = perms.data
              this.loading = false
              this.pageContent = 'total, sizes, prev, pager, next, jumper'
            }
          })).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      getData () {
        return this.axios.post('/api/employeeList', {
          user_name: this.user_name,
          user_mobile: this.user_mobile,
          user_email: this.user_email,
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/employeeList/count', {
          user_name: this.user_name,
          user_mobile: this.user_mobile,
          user_email: this.user_email
        })
      },
      search () {
        this.loading = true
        this.getDataInit()
      },
      handleEdit (index, row) {
//        this.$nextTick(function () {
//          this.currentTables = this.selectBaseTable(row.available_table)
//        })
//        console.log(this.currentTables)
        this.isShowDetail = !this.isShowDetail
        this.ruleForm = row
      },
//      handleDelete (index, row) {
//        console.log(index, row)
//      },
      closeDetial () {
        this.isShowDetail = !this.isShowDetail
      },
      submitForm () {
        let selectInfo = this.$refs.tree.getCheckedNodes()
        let set = new Set()
        for (let i of selectInfo) {
          let array = i.mark
          if (array) {
            for (let j of array) {
              set.add(j)
            }
          }
        }
        this.axios.post('/api/employeeList/privilegeModify', {
          email: this.ruleForm.user_email,
          tables: Array.from(set).join('|')
        }).then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.$message({
              message: '修改权限请求超时，请刷新页面重试',
              type: 'warning'
            })
          } else {
            if (response.data === 200) {
              this.$message({
                message: '权限修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '修改权限失败，请重试',
                type: 'warning'
              })
            }
          }
        })
      }
//      selectBaseTable (arrays) {
//        let tables = arrays.split('|')
//        temp = tables.filter(this.filterBaseTableleft)
//        return tables.filter(this.filterBaseTableRight)
//      },
//      filterBaseTableleft (str) {
//        return parentTable.indexOf(str) !== -1
//      },
//      filterBaseTableRight (str) {
//        return temp.indexOf(str) === -1
//      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .employeeList
    height: 100%
    .employeeList-table
      border-radius :10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
        font-size: 14px
        color: #666
      .managerText
        width: 180px
      .userButton
        margin-left: 5px
      .promotionChannelSelect
        width: 150px
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
          width: 500px
          height: 550px
          border-radius: 5px
          text-align: center
          background-color: #fff
          .main-header
            width: 100%
            height: 100px
            background-color: rgb(50, 140, 195)
            padding-top: 20px
            .avatar
              position: relative
              left: 20px
              display: inline-block
              float: left
              box-sizing: border-box
              width: 150px
              height: 100%
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
              line-height: 70px
              margin-left: -70px
              font-size: 20px
              color: #ffffff
          .main-content
            padding: 35px 20px 0 20px
            .ruleForm
              display: inline-block
              margin-right: 60px
              width: 150px
              .form-input
                width: 150px
              .employeeList-button
                margin-left: -30px
            .employeeList-tree
              float: right
              width: 240px
              height: 268px
              border: 1px solid #ccc
              overflow: scroll
              .el-tree
                width: 100%
                border: none
                text-align: left
                color: #cccccc
      .detail-close
        position: absolute
        top: 50px
        right: 150px
        padding-top: 16px
        width: 32px
        height: 32px
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
