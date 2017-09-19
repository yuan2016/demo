<template>
  <div class="invitationEvent" v-loading.body="loading" element-loading-text="拼命加载中" :style="{ height: dHeight + 'px' }">
    <banner></banner>
    <!--<div class="date-filter">-->
    <!--<span class="managerFront">借款类型：</span>-->
    <!--<el-select v-model.trim="loan_term" size="small" placeholder="14天" class="loanOverdueRecallRateSelect"-->
    <!--@change="search">-->
    <!--<el-option-->
    <!--v-for="item in options"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <el-table :data="fundData" highlight-current-row border
              style="width: 100%;overflow: auto;" :height="height" class="invitationEvent-table">
      <el-table-column property="AA" :label="labels[0]" width="180"></el-table-column>
      <el-table-column property="D1" :label="labels[1]" width="110"></el-table-column>
      <el-table-column property="D2" :label="labels[2]" width="110"></el-table-column>
      <el-table-column property="D3" :label="labels[3]" width="110"></el-table-column>
      <el-table-column property="D4" :label="labels[4]" width="110"></el-table-column>
      <el-table-column property="D5" :label="labels[5]" width="110"></el-table-column>
      <el-table-column property="D6" :label="labels[6]" width="110"></el-table-column>
      <el-table-column property="D7" :label="labels[7]" width="110"></el-table-column>
      <el-table-column property="DOD" :label="labels[8]" width="110"></el-table-column>
      <el-table-column property="W1" :label="labels[9]" width="110"></el-table-column>
      <el-table-column property="W2" :label="labels[10]" width="110"></el-table-column>
      <el-table-column property="W3" :label="labels[11]" width="110"></el-table-column>
      <el-table-column property="W4" :label="labels[12]" width="110"></el-table-column>
      <el-table-column property="WOW" :label="labels[13]" width="110"></el-table-column>
      <el-table-column property="M1" :label="labels[14]" width="110"></el-table-column>
      <el-table-column property="M2" :label="labels[15]" width="110"></el-table-column>
      <el-table-column property="M3" :label="labels[16]" width="110"></el-table-column>
      <el-table-column property="MOM" :label="labels[17]" width="110"></el-table-column>
    </el-table>
    <div class="pop1">
      <p class="popTop">(本期数据-对照数据)/对照数据</p>
      <p>本期百分比-对照百分比</p>
    </div>
    <div class="pop2">
      <p class="popTop">(本期数据-对照数据)/对照数据</p>
      <p>本期百分比-对照百分比</p>
    </div>
    <div class="pop3">
      <p class="popTop">(本期数据-对照数据)/对照数据</p>
      <p>本期百分比-对照百分比</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../../common/banner/banner'
  import { getProperty } from '../../../../../common/js/utils'
  import $ from 'jquery'

  const defaultBlank = ['指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']

  export default {
    data () {
      return {
        labels: [],
        fundData: [],
        loading: false,
        height: 500,
        backcolor1: [],
        dHeight: 500
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getData()
    },
    mounted () {
      this.resizeHeight()
    },
    methods: {
      getData () {
        this.axios.post('/api/invitationEvent').then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.labels = defaultBlank
            this.loading = false
            this.$message({
              message: '请求超时，请重试',
              type: 'warning'
            })
          } else {
            this.fundData = response.data.slice(2)
            this.backcolor1 = response.data[0].D1.split(',')
            if (this.fundData.length === 0) {
              this.labels = defaultBlank
              this.loading = false
            } else {
              this.labels = getProperty(response.data[1])
              this.loading = false
            }
          }
        }).catch(() => {
          this.fundData = []
          this.labels = defaultBlank
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      },
      search () {
        this.loading = true
        this.getData()
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
        this.height = docH - filterH - bannerH - pageH - 77 /*90+20*/
        this.dHeight = docH - 90
      }
    },
    updated () {
      if ($('.el-table__row').length > 0) {
        let backcolor1 = this.backcolor1
        let pops = [8, 13, 17]
        let info0 = $('<i class="elextra-icon-info"></i>')
        let info1 = $('<i class="elextra-icon-info"></i>')
        let info2 = $('<i class="elextra-icon-info"></i>')
        let infos = [info0, info1, info2]
        for (let i = 0; i < pops.length; i++) {
          $('.el-table__header>thead>tr>th:eq(' + pops[i] + ')').css('position', 'relative').append(infos[i])
        }
        let popName = [$('.pop1'), $('.pop2'), $('.pop3')]
        if ($('.el-table__row').length > 0) {
          let clientWidth = document.documentElement.clientWidth
          for (let i = 0; i < pops.length; i++) {
            $('.el-table__header>thead>tr>th:eq(' + pops[i] + ')>i').on('mouseover', function (event) {
              let x = clientWidth - event.clientX
              let y = event.clientY - 50
              popName[i].css('display', 'block').css('top', y).css('right', x)
            }).on('mouseout', function () {
              popName[i].css('display', 'none')
            })
          }
          for (let i of backcolor1) {
            $('.el-table__row:eq(' + i + ')>td:eq(0)').css('background-color', '#93c2d2')
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .invitationEvent
    .invitationEvent-table
      margin-top :20px
      border-radius :10px
    .pop1
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow: 5px 5px 5px #999
    .pop2
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow: 5px 5px 5px #999
    .pop3
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow: 5px 5px 5px #999

    .popTop
      padding-bottom: 5px

    .elextra-icon-info
      position: absolute
      top: 9px
      right: -7px
      font-size: 20px
      color: rgb(102, 102, 102)



  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold

</style>
