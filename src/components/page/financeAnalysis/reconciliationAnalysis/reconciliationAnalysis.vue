<template>
  <div class="reconciliationAnalysis" v-loading.body="loading" element-loading-text="拼命加载中"
       :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <div class="date-filter">
      <li>
        <span class="managerFront">日期：</span>
        <el-date-picker
          size="small"
          v-model.trim="startTime"
          type="date"
          placeholder="从">
        </el-date-picker>
        <el-date-picker
          size="small"
          v-model.trim="endTime"
          type="date"
          placeholder="到">
        </el-date-picker>
      </li>
      <li>
        <el-button type="primary" size="small" @click.prevent.stop="search" class="userButton">搜索</el-button>
        <el-button type="primary" size="small" class="userButtonSpecial">
          <a :href="mosaicLink" class="reconciliationAnalysisExcel">导出excel</a>
        </el-button>
      </li>
    </div>
    <!--<el-table :data="fundData" highlight-current-row border stripe class="reconciliationAnalysis-table"-->
    <!--style="width: 100%;overflow: auto" :height="height" @current-change="showChange">-->
    <!--<el-table-column property="d_date" sortable="custom" label="日期" width="80px"></el-table-column>-->
    <!--<el-table-column label="富友账户">-->
    <!--<el-table-column property="AMT_FY" label="后台数据(元)" width="100"></el-table-column>-->
    <!--<el-table-column label="第三方数据" width="100">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.AMT_FY_THIRD" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.AMT_FY_THIRD}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="差异（后台-第三方）" width="120">-->
    <!--<template scope="scope">-->
    <!--&lt;!&ndash;<el-input size="mini" v-model="scope.row.AMT_FY_DIFF" placeholder="请输入内容"></el-input>&ndash;&gt;-->
    <!--<span>{{change(JSON.stringify(scope.row.AMT_FY), JSON.stringify(scope.row.AMT_FY_THIRD))}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="连连账户">-->
    <!--<el-table-column property="AMT_LL" label="后台数据(元)" width="100"></el-table-column>-->
    <!--<el-table-column label="第三方数据" width="100">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.AMT_LL_THIRD" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.AMT_LL_THIRD}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="差异（后台-第三方）" width="120">-->
    <!--<template scope="scope">-->
    <!--&lt;!&ndash;<el-input size="mini" v-model="scope.row.AMT_LL_DIFF" placeholder="请输入内容"></el-input>&ndash;&gt;-->
    <!--<span>{{scope.row.AMT_LL_DIFF}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="支付宝账户">-->
    <!--<el-table-column property="AMT_ZFB" label="后台数据(元)" width="100"></el-table-column>-->
    <!--<el-table-column label="第三方数据" width="100">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.AMT_ZFB_THIRD" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.AMT_ZFB_THIRD}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="差异（后台-第三方）" width="120">-->
    <!--<template scope="scope">-->
    <!--&lt;!&ndash;<el-input size="mini" v-model="scope.row.AMT_ZFB_DIFF" placeholder="请输入内容"></el-input>&ndash;&gt;-->
    <!--<span>{{scope.row.AMT_ZFB_DIFF}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="益码通支付宝账户">-->
    <!--<el-table-column property="AMT_YMT" label="后台数据(元)" width="100"></el-table-column>-->
    <!--<el-table-column label="第三方数据" width="100">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.AMT_YMT_THIRD" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.AMT_YMT_THIRD}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="差异（后台-第三方）" width="120">-->
    <!--<template scope="scope">-->
    <!--&lt;!&ndash;<el-input size="mini" v-model="scope.row.AMT_YMT_DIFF" placeholder="请输入内容"></el-input>&ndash;&gt;-->
    <!--<span>{{scope.row.AMT_YMT_DIFF}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="拉卡拉">-->
    <!--<el-table-column property="AMT_LKL" label="后台数据(元)" width="100"></el-table-column>-->
    <!--<el-table-column label="第三方数据" width="100">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.AMT_LKL_THIRD" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.AMT_LKL_THIRD}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="差异（后台-第三方）" width="120">-->
    <!--<template scope="scope">-->
    <!--&lt;!&ndash;<el-input size="mini" v-model="scope.row.AMT_LKL_DIFF" placeholder="请输入内容"></el-input>&ndash;&gt;-->
    <!--<span>{{scope.row.AMT_LKL_DIFF}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="批注">-->
    <!--<el-table-column property="AMT_JM" label="线下免还款金额(元)"></el-table-column>-->
    <!--<el-table-column property="AMT_YH" label="优惠金额(元)" width="90"></el-table-column>-->
    <!--<el-table-column property="" label="备注">-->
    <!--<template scope="scope">-->
    <!--<el-input size="mini" v-model="scope.row.REMARK" placeholder="请输入内容"></el-input>-->
    <!--<span>{{scope.row.REMARK}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <el-table :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto" :height="height" @row-dblclick="showData"
              class="reconciliationAnalysis-table" @sort-change="sort">
      <el-table-column property="d_date" sortable="custom" label="日期" width="80px"></el-table-column>
      <el-table-column label="富友账户">
        <el-table-column property="AMT_FY" label="后台数据(元)" width="120"></el-table-column>
        <el-table-column property="AMT_FY_THIRD" label="第三方数据" width="120"></el-table-column>
        <el-table-column property="AMT_FY_DIFF" label="差异（后台-第三方）" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="连连账户">
        <el-table-column property="AMT_LL" label="后台数据(元)" width="120"></el-table-column>
        <el-table-column property="AMT_LL_THIRD" label="第三方数据" width="120"></el-table-column>
        <el-table-column property="AMT_LL_DIFF" label="差异（后台-第三方）" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="支付宝账户">
        <el-table-column property="AMT_ZFB" label="后台数据(元)" width="120"></el-table-column>
        <el-table-column property="AMT_ZFB_THIRD" label="第三方数据" width="120"></el-table-column>
        <el-table-column property="AMT_ZFB_DIFF" label="差异（后台-第三方）" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="益码通支付宝账户">
        <el-table-column property="AMT_YMT" label="后台数据(元)" width="120"></el-table-column>
        <el-table-column property="AMT_YMT_THIRD" label="第三方数据" width="120"></el-table-column>
        <el-table-column property="AMT_YMT_DIFF" label="差异（后台-第三方）" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="拉卡拉">
        <el-table-column property="AMT_LKL" label="后台数据(元)" width="120"></el-table-column>
        <el-table-column property="AMT_LKL_THIRD" label="第三方数据" width="120"></el-table-column>
        <el-table-column property="AMT_LKL_DIFF" label="差异（后台-第三方）" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="批注">
        <el-table-column property="AMT_JM" label="线下免还款金额(元)" width="120"></el-table-column>
        <el-table-column property="AMT_YH" label="优惠金额(元)" width="120"></el-table-column>
        <el-table-column property="REMARK" label="备注" width="300"></el-table-column>
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
            <div class="title">第三方数据</div>
            <el-form :label-position="labelPosition" label-width="120px" :rules="loginRules" :model="formLabelAlign"
                     class="reconciliationAnalysis-form" ref="ruleForm">
              <el-form-item prop="AMT_FY_THIRD" size="small" label="富友:">
                <el-input v-model.trim="formLabelAlign.AMT_FY_THIRD"></el-input>
              </el-form-item>
              <el-form-item prop="AMT_LL_THIRD" size="small" label="连连:">
                <el-input v-model.trim="formLabelAlign.AMT_LL_THIRD"></el-input>
              </el-form-item>
              <el-form-item prop="AMT_ZFB_THIRD" size="small" label="支付宝:">
                <el-input v-model.trim="formLabelAlign.AMT_ZFB_THIRD"></el-input>
              </el-form-item>
              <el-form-item prop="AMT_YMT_THIRD" size="small" label="益码通支付宝:">
                <el-input v-model.trim="formLabelAlign.AMT_YMT_THIRD"></el-input>
              </el-form-item>
              <el-form-item prop="AMT_LKL_THIRD" size="small" label="拉卡拉:">
                <el-input v-model.trim="formLabelAlign.AMT_LKL_THIRD"></el-input>
              </el-form-item>
              <el-form-item size="small" label="备注:">
                <el-input type="textarea" v-model.trim="formLabelAlign.REMARK"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="reconciliationAnalysis-button" @click="saveData('ruleForm')">
                  立即修改
                </el-button>
              </el-form-item>
            </el-form>
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

  export default {
    data () {
      const validateMoney = (rule, v, callback) => {
        if (!v) {
          callback()
        } else {
          if (!(/^(-?\d+)(\.\d+)?$/).test(v.split(',').join(''))) {
            callback(new Error('请填写正确格式'))
          } else {
            callback()
          }
        }
      }
      return {
        fundData: [],
        loading: false,
        pageContent: 'sizes',
        currentRow: '',
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        height: 500,
        buttonLoading: false,
        isShowDetail: false,
        labelPosition: 'right',
        formLabelAlign: {
          AMT_FY_THIRD: '',
          AMT_FY_DIFF: '',
          AMT_LL_THIRD: '',
          AMT_LL_DIFF: '',
          AMT_ZFB_THIRD: '',
          AMT_ZFB_DIFF: '',
          AMT_YMT_THIRD: '',
          AMT_YMT_DIFF: '',
          AMT_LKL_THIRD: '',
          AMT_LKL_DIFF: '',
          REMARK: ''
        },
        loginRules: {
          AMT_FY_THIRD: [
            {required: false, trigger: 'blur', validator: validateMoney}
          ],
          AMT_LL_THIRD: [
            {required: false, trigger: 'blur', validator: validateMoney}
          ],
          AMT_ZFB_THIRD: [
            {required: false, trigger: 'blur', validator: validateMoney}
          ],
          AMT_YMT_THIRD: [
            {required: false, trigger: 'blur', validator: validateMoney}
          ],
          AMT_LKL_THIRD: [
            {required: false, trigger: 'blur', validator: validateMoney}
          ]
        },
        currentRowData: {},
        dHeight: 500,
        order: ''
      }
    },
    computed: {
      mosaicLink () {
        let startTime
        let endTime
        if (this.startTime === '') {
          startTime = this.startTime
        } else {
          startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime === '') {
          endTime = this.endTime
        } else {
          endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        return 'api/reconciliationAnalysis/excel?startTime=' + startTime + '&endTime=' + endTime
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
    },
    mounted () {
      this.resizeHeight()
    },
    methods: {
//      showChange (a, b) {
//        console.log(a)
//        console.log(b)
//      },
//      change (a, b) {
//        if (!a || !b) {
//          console.log(111)
//          return this.changeItem(a) - this.changeItem(b)
//        } else {
//          return ''
//        }
//      },
      closeDetial () {
        this.isShowDetail = !this.isShowDetail
      },
      showData (row) {
        this.currentRowData = row
        this.formLabelAlign = {
          AMT_FY_THIRD: row.AMT_FY_THIRD,
          AMT_FY_DIFF: row.AMT_FY_DIFF,
          AMT_LL_THIRD: row.AMT_LL_THIRD,
          AMT_LL_DIFF: row.AMT_LL_DIFF,
          AMT_ZFB_THIRD: row.AMT_ZFB_THIRD,
          AMT_ZFB_DIFF: row.AMT_ZFB_DIFF,
          AMT_YMT_THIRD: row.AMT_YMT_THIRD,
          AMT_YMT_DIFF: row.AMT_YMT_DIFF,
          AMT_LKL_THIRD: row.AMT_LKL_THIRD,
          AMT_LKL_DIFF: row.AMT_LKL_DIFF,
          REMARK: row.REMARK
        }
        this.isShowDetail = !this.isShowDetail
      },
      //千分位表示为普通数字表示
      changeItem (a) {
        if (a === 0 || a === '0') {
          return a
        }
        return parseFloat(a.split(',').join(''))
      },
      saveData () {
        let extra = this.formLabelAlign
        let origin = this.currentRowData
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (extra.AMT_FY_THIRD === '' || extra.AMT_FY_THIRD === null) {
              extra.AMT_FY_THIRD = null
              extra.AMT_FY_DIFF = null
            }
            if (extra.AMT_LL_THIRD === '' || extra.AMT_LL_THIRD === null) {
              extra.AMT_LL_THIRD = null
              extra.AMT_LL_DIFF = null
            }
            if (extra.AMT_ZFB_THIRD === '' || extra.AMT_ZFB_THIRD === null) {
              extra.AMT_ZFB_THIRD = null
              extra.AMT_ZFB_DIFF = null
            }
            if (extra.AMT_YMT_THIRD === '' || extra.AMT_YMT_THIRD === null) {
              extra.AMT_YMT_THIRD = null
              extra.AMT_YMT_DIFF = null
            }
            if (extra.AMT_LKL_THIRD === '' || extra.AMT_LKL_THIRD === null) {
              extra.AMT_LKL_THIRD = null
              extra.AMT_LKL_DIFF = null
            }
            if ((origin.AMT_FY !== '' && origin.AMT_FY !== null) && extra.AMT_FY_THIRD) {
              extra.AMT_FY_DIFF = this.changeItem(origin.AMT_FY) - this.changeItem(extra.AMT_FY_THIRD)
            }
            if ((origin.AMT_LL !== '' && origin.AMT_LL !== null) && extra.AMT_LL_THIRD) {
              extra.AMT_LL_DIFF = this.changeItem(origin.AMT_LL) - this.changeItem(extra.AMT_LL_THIRD)
            }
            if ((origin.AMT_ZFB !== '' && origin.AMT_ZFB !== null) && extra.AMT_ZFB_THIRD) {
              extra.AMT_ZFB_DIFF = this.changeItem(origin.AMT_ZFB) - this.changeItem(extra.AMT_ZFB_THIRD)
            }
            if ((origin.AMT_YMT !== '' && origin.AMT_YMT !== null) && extra.AMT_YMT_THIRD) {
              extra.AMT_YMT_DIFF = this.changeItem(origin.AMT_YMT) - this.changeItem(extra.AMT_YMT_THIRD)
            }
            if ((origin.AMT_LKL !== '' && origin.AMT_LKL !== null) && extra.AMT_LKL_THIRD) {
              extra.AMT_LKL_DIFF = this.changeItem(origin.AMT_LKL) - this.changeItem(extra.AMT_LKL_THIRD)
            }

            this.axios.post('/api/reconciliationAnalysis/modify', {
              formData: this.formLabelAlign,
              date: origin.d_date
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
                  this.loading = true
                  this.getDataInit()
                  this.height = parseInt(getHeight()) + 40
                  this.isShowDetail = !this.isShowDetail
                } else {
                  this.$message({
                    message: '修改信息失败，请重试',
                    type: 'warning'
                  })
                }
              }
            })
          }
        })
      },
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
        return this.axios.post('/api/reconciliationAnalysis', {
          limit: this.limit,
          offset: this.offset,
          startTime: this.startTime,
          endTime: this.endTime,
          order: this.order
        })
      },
      getCount () {
        return this.axios.post('/api/reconciliationAnalysis/count', {
          startTime: this.startTime,
          endTime: this.endTime
        })
      },
      search () {
        this.loading = true
        if (this.startTime !== '') {
          this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        this.getDataInit()
      },
      resizeHeight () {
        this.setHeight()
        window.onresize = this.setHeight
      },
      setHeight () {
        let docH = document.documentElement.clientHeight
        let banner = document.getElementsByClassName('banner')[0]
        let bannerH = 0
        let filter = document.getElementsByClassName('date-filter')[0]
        let filterH = 0
        let page = document.getElementsByClassName('el-pagination')[0]
        let pageH = 0
        if (banner) {
          bannerH = banner.offsetHeight
        }
        if (filter) {
          filterH = filter.clientHeight
        }
        if (page) {
          if (page.offsetHeight !== 0) {
            pageH = page.offsetHeight
          } else {
            pageH = 32
          }
        } else {
          pageH = 60
        }
        this.height = docH - filterH - bannerH - pageH - 85
        /*90+20*/
        this.dHeight = docH - 90
      },
      sort (info) {
        if (info.order === 'ascending') {
          this.order = ' order by ' + 't.' + info.prop + ' asc'
        } else if (info.order === 'descending') {
          this.order = ' order by ' + 't.' + info.prop + ' desc'
        } else {
          this.order = ''
        }
        this.search(this.order)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .reconciliationAnalysis
    height: 100%
    .reconciliationAnalysis-table
      border-radius: 10px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      display: flex
      flex-wrap: wrap
      li
        margin-bottom: 5px
        .managerFront
          padding-left: 5px
          font-size: 14px
          color: #666
        .reconciliationAnalysisExcel
          color: #fff
        .userButton
          margin-left :10px
        .userButtonSpecial
          margin-left :5px
    .reconciliationAnalysis-table
      border-radius :10px
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
        transition: all .1s linear
      &.fade-leave-active
        opacity: 0
        transition: all .1s linear
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
          width: 350px
          height: 500px
          border-radius: 5px
          text-align: center
          background-color: rgb(239, 242, 247)
          .title
            box-sizing: border-box
            padding-left: 20px
            height: 60px
            line-height: 60px
            width: 100%
            text-align: left
            font-size: 25px
            color: #fff
            border-radius: 4px 4px 0 0
            background-color rgb(50, 140, 195)
          .reconciliationAnalysis-form
            margin: 20px 20px 20px 0
          .reconciliationAnalysis-button
            width: 200px
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

    .el-form-item__content
      width: 200px

  .reconciliationAnalysis-table .el-input {
    display: none
  }

  .reconciliationAnalysis-table .current-row .el-input {
    display: block
  }

  .reconciliationAnalysis-table .current-row .el-input + span {
    display: none
  }
</style>
