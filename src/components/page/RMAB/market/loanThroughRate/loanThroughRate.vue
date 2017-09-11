<template>
  <div class="loanThroughRate" v-loading="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">状态：</span>
      <el-select v-model="value" size="small" placeholder="TopN" @change="changeValue" class="loanThroughRateSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table :data="fundData" highlight-current-row border stripe
              style="width: 100%;overflow: auto;" :height="height" class="loanThroughTable">
      <el-table-column property="AA" :label="labels[0]" width="160px"></el-table-column>
      <el-table-column property="D1" :label="labels[1]"></el-table-column>
      <el-table-column property="D2" :label="labels[2]"></el-table-column>
      <el-table-column property="D3" :label="labels[3]"></el-table-column>
      <el-table-column property="D4" :label="labels[4]"></el-table-column>
      <el-table-column property="D5" :label="labels[5]"></el-table-column>
      <el-table-column property="D6" :label="labels[6]"></el-table-column>
      <el-table-column property="D7" :label="labels[7]"></el-table-column>
      <el-table-column property="DOD" :label="labels[8]"></el-table-column>
      <el-table-column property="W1" :label="labels[9]"></el-table-column>
      <el-table-column property="W2" :label="labels[10]"></el-table-column>
      <el-table-column property="W3" :label="labels[11]"></el-table-column>
      <el-table-column property="W4" :label="labels[12]"></el-table-column>
      <el-table-column property="WOW" :label="labels[13]"></el-table-column>
      <el-table-column property="M1" :label="labels[14]"></el-table-column>
      <el-table-column property="M2" :label="labels[15]"></el-table-column>
      <el-table-column property="M3" :label="labels[16]"></el-table-column>
      <el-table-column property="MOM" :label="labels[17]"></el-table-column>
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
  import { getHeight } from '../../../../../common/js/storage'
  import $ from 'jquery'

  export default {
    data () {
      return {
        labels: [],
        radio: '1',
        fundData: [],
        loading: false,
        height: 500,
        value: '',
        options: [{
          value: '0',
          label: 'TopN'
        }, {
          value: '1',
          label: '全部'
        }],
        iconIndex: [],
        backcolor1: [],
        backcolor2: [],
        diff: []
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.height = parseInt(getHeight()) + 60
      this.getData()
    },
    methods: {
      changeValue () {
        if (this.value === '0') {
          this.$router.push('loanThroughRate')
        } else if (this.value === '1') {
          this.$router.push('loanThroughRateAll')
        }
      },
      getData () {
        this.axios.post('/api/loanThroughRate').then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.labels = ['指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']
            this.loading = false
            this.$message({
              message: '请求超时，请重试',
              type: 'warning'
            })
          } else {
            this.iconIndex = response.data[0].D3.split(',')
            this.backcolor1 = response.data[0].D1.split(',')
            this.backcolor2 = response.data[0].D2.split(',')
            this.diff = response.data[0].D4.split(',')
            this.fundData = response.data.slice(2)
            this.labels = getProperty(response.data[1])
            this.loading = false
          }
        }).catch(() => {
          this.fundData = []
          this.labels = ['指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']
          this.loading = false
          this.$message({
            message: '数据正在更新，请稍候',
            type: 'warning'
          })
        })
      }
    },
    updated () {
      if ($('.el-table__row').length > 0) {
        let pops = [8, 13, 17]
        let info0 = $('<i class="elextra-icon-info"></i>')
        let info1 = $('<i class="elextra-icon-info"></i>')
        let info2 = $('<i class="elextra-icon-info"></i>')
        let infos = [info0, info1, info2]
        for (let i = 0; i < pops.length; i++) {
          $('.el-table__header>thead>tr>th:eq(' + pops[i] + ')').css('position', 'relative').append(infos[i])
        }
        let popName = [$('.pop1'), $('.pop2'), $('.pop3')]
        let clientWidth = document.documentElement.clientWidth
        for (let i = 0; i < pops.length; i++) {
          $('.el-table__header>thead>tr>th:eq(' + pops[i] + ')>i ').on('mouseover', function (event) {
            let x = clientWidth - event.clientX
            let y = event.clientY - 50
            popName[i].css('display', 'block').css('top', y).css('right', x)
          }).on('mouseout', function () {
            popName[i].css('display', 'none')
          })
        }
        let iconIndex = this.iconIndex
        let backcolor1 = this.backcolor1
        let backcolor2 = this.backcolor2
        let diff = this.diff

        let icon0 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon1 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon2 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon3 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon4 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon5 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon6 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon7 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon8 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon9 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon10 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon11 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon12 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon13 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon14 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon15 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon16 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon17 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon18 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon19 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon20 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon21 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon22 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon23 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon24 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon25 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon26 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon27 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon28 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon29 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icon30 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
        let icons = [icon0, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19, icon20, icon21, icon22, icon23, icon24, icon25, icon26, icon27, icon28, icon29, icon30]

        for (let i = 0; i < iconIndex.length; i++) {
          $('.el-table__row:eq(' + iconIndex[i] + ') td:eq(0) div').append(icons[i])
        }
        for (let i of backcolor1) {
          $('.el-table__row:eq(' + i + ')>td:eq(0)').css('background-color', '#93c2d2')
        }
        for (let i of backcolor2) {
          $('.el-table__row:eq(' + i + ')>td:eq(0)').css('background-color', '#d0ecf5')
        }
        for (let i = 0; i < iconIndex.length; i++) {
          $('.el-table__row:gt(' + iconIndex[i] + '):lt(' + diff[i] + ')').css('display', 'none')
          $('.el-table__row:eq(' + iconIndex[i] + ')').on('click', () => {
            if (!$('.el-table__row:eq(' + iconIndex[i] + ')').hasClass('isOpen')) {
              $('.el-table__row:gt(' + iconIndex[i] + '):lt(' + diff[i] + ')').css('display', 'table-row')
              $('.el-table__row:eq(' + iconIndex[i] + ')').addClass('isOpen')
              icons[i].removeClass('el-icon-arrow-down').addClass('el-icon-arrow-up')
            } else {
              $('.el-table__row:eq(' + iconIndex[i] + ')').removeClass('isOpen')
              $('.el-table__row:gt(' + iconIndex[i] + '):lt(' + diff[i] + ')').css('display', 'none')
              icons[i].removeClass('el-icon-arrow-up').addClass('el-icon-arrow-down')
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loanThroughRate
    position: relative
    font-size: 12px
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        padding-left: 5px
        font-size: 14px
        color: #666
      .loanThroughRateSelect
        width: 100px
    .loanThroughRateInfo
      padding-top: 5px
      font-size: 12px
      color: red
    .pop1,.pop2,.pop3
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
