<template>
  <div class="loanThroughRate" v-loading="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">状态：</span>
      <el-select v-model="value" size="small" placeholder="部分" @change="changeValue" class="loanThroughRateSelect">
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
    <p class="loanThroughRateInfo">说明：（字体红色）</p>
    <p class="loanThroughRateInfo">数据同环比计算公式: (本期数据-对照数据)/对照数据；</p>
    <p class="loanThroughRateInfo">百分比同环比计算公式: 本期百分比-对照百分比</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'
  import { getProperty } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'
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
          label: '部分'
        }, {
          value: '1',
          label: '全部'
        }]
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.height = parseInt(getHeight()) + 10
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
            this.fundData = response.data.slice(1)
            this.labels = getProperty(response.data[0])
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
//      let $h1 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
//      let $h2 = $('<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>')
//      $('.el-table__row:eq(0) td:eq(0) div').append($h1)
//      $('.el-table__row:eq(25) td:eq(0) div').append($h2)
      $('.el-table__row:gt(0):lt(24)').css('display', 'none')
      $('.el-table__row:gt(25):lt(24)').css('display', 'none')
      $('.el-table__row:gt(51):lt(20)').css('display', 'none')
      $('.el-table__row:gt(74):lt(20)').css('display', 'none')
      $('.el-table__row:gt(97):lt(20)').css('display', 'none')
      $('.el-table__row:gt(120):lt(20)').css('display', 'none')
      $('.el-table__row:gt(143):lt(20)').css('display', 'none')
      $('.el-table__row:gt(166):lt(20)').css('display', 'none')
      $('.el-table__row:gt(189):lt(20)').css('display', 'none')
      $('.el-table__row:gt(194):lt(20)').css('display', 'none')
      $('.el-table__row:gt(212):lt(20)').css('display', 'none')
      $('.el-table__row:gt(235):lt(20)').css('display', 'none')
      $('.el-table__row:gt(258):lt(20)').css('display', 'none')
      $('.el-table__row:gt(281):lt(20)').css('display', 'none')
      $('.el-table__row:gt(304):lt(20)').css('display', 'none')
      $('.el-table__row:gt(327):lt(20)').css('display', 'none')
      $('.el-table__row:gt(350):lt(20)').css('display', 'none')
      $('.el-table__row:eq(0)').on('click', () => {
        if (!$('.el-table__row:eq(0)').hasClass('isOpen')) {
          $('.el-table__row:gt(0):lt(24)').css('display', 'table-row')
          $('.el-table__row:eq(0)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(0)').removeClass('isOpen')
          $('.el-table__row:gt(0):lt(24)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(25)').on('click', () => {
        if (!$('.el-table__row:eq(25)').hasClass('isOpen')) {
          $('.el-table__row:gt(25):lt(24)').css('display', 'table-row')
          $('.el-table__row:eq(25)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(25)').removeClass('isOpen')
          $('.el-table__row:gt(25):lt(24)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(51)').on('click', () => {
        if (!$('.el-table__row:eq(51)').hasClass('isOpen')) {
          $('.el-table__row:gt(51):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(51)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(51)').removeClass('isOpen')
          $('.el-table__row:gt(51):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(74)').on('click', () => {
        if (!$('.el-table__row:eq(74)').hasClass('isOpen')) {
          $('.el-table__row:gt(74):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(74)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(74)').removeClass('isOpen')
          $('.el-table__row:gt(74):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(97)').on('click', () => {
        if (!$('.el-table__row:eq(97)').hasClass('isOpen')) {
          $('.el-table__row:gt(97):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(97)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(97)').removeClass('isOpen')
          $('.el-table__row:gt(97):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(120)').on('click', () => {
        if (!$('.el-table__row:eq(120)').hasClass('isOpen')) {
          $('.el-table__row:gt(120):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(120)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(120)').removeClass('isOpen')
          $('.el-table__row:gt(120):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(143)').on('click', () => {
        if (!$('.el-table__row:eq(143)').hasClass('isOpen')) {
          $('.el-table__row:gt(143):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(143)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(143)').removeClass('isOpen')
          $('.el-table__row:gt(143):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(166)').on('click', () => {
        if (!$('.el-table__row:eq(166)').hasClass('isOpen')) {
          $('.el-table__row:gt(166):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(166)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(166)').removeClass('isOpen')
          $('.el-table__row:gt(166):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(189)').on('click', () => {
        if (!$('.el-table__row:eq(189)').hasClass('isOpen')) {
          $('.el-table__row:gt(189):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(189)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(189)').removeClass('isOpen')
          $('.el-table__row:gt(189):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(194)').on('click', () => {
        if (!$('.el-table__row:eq(194)').hasClass('isOpen')) {
          $('.el-table__row:gt(194):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(194)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(194)').removeClass('isOpen')
          $('.el-table__row:gt(194):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(212)').on('click', () => {
        if (!$('.el-table__row:eq(212)').hasClass('isOpen')) {
          $('.el-table__row:gt(212):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(212)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(212)').removeClass('isOpen')
          $('.el-table__row:gt(212):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(235)').on('click', () => {
        if (!$('.el-table__row:eq(235)').hasClass('isOpen')) {
          $('.el-table__row:gt(235):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(235)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(235)').removeClass('isOpen')
          $('.el-table__row:gt(235):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(258)').on('click', () => {
        if (!$('.el-table__row:eq(258)').hasClass('isOpen')) {
          $('.el-table__row:gt(258):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(258)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(258)').removeClass('isOpen')
          $('.el-table__row:gt(258):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(281)').on('click', () => {
        if (!$('.el-table__row:eq(281)').hasClass('isOpen')) {
          $('.el-table__row:gt(281):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(281)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(281)').removeClass('isOpen')
          $('.el-table__row:gt(281):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(304)').on('click', () => {
        if (!$('.el-table__row:eq(304)').hasClass('isOpen')) {
          $('.el-table__row:gt(304):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(304)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(304)').removeClass('isOpen')
          $('.el-table__row:gt(304):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(327)').on('click', () => {
        if (!$('.el-table__row:eq(327)').hasClass('isOpen')) {
          $('.el-table__row:gt(327):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(327)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(327)').removeClass('isOpen')
          $('.el-table__row:gt(327):lt(20)').css('display', 'none')
        }
      })
      $('.el-table__row:eq(350)').on('click', () => {
        if (!$('.el-table__row:eq(350)').hasClass('isOpen')) {
          $('.el-table__row:gt(350):lt(20)').css('display', 'table-row')
          $('.el-table__row:eq(350)').addClass('isOpen')
        } else {
          $('.el-table__row:eq(350)').removeClass('isOpen')
          $('.el-table__row:gt(350):lt(20)').css('display', 'none')
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loanThroughRate
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

  .loanThroughTable
    .el-table__row:nth-child(1), .el-table__row:nth-child(26), .el-table__row:nth-child(73), .el-table__row:nth-child(96), .el-table__row:nth-child(119), .el-table__row:nth-child(142), .el-table__row:nth-child(165), .el-table__row:nth-child(188), .el-table__row:nth-child(211), .el-table__row:nth-child(234), .el-table__row:nth-child(257), .el-table__row:nth-child(280), .el-table__row:nth-child(303), .el-table__row:nth-child(326)
      td:nth-of-type(1)
        div
          background-color: #93c2d2
          font-weight: bold

  .loanThroughTable
    .el-table__row:nth-child(51), .el-table__row:nth-child(52), .el-table__row:nth-child(74), .el-table__row:nth-child(75), .el-table__row:nth-child(97), .el-table__row:nth-child(98), .el-table__row:nth-child(120), .el-table__row:nth-child(121), .el-table__row:nth-child(143), .el-table__row:nth-child(144), .el-table__row:nth-child(166), .el-table__row:nth-child(167), .el-table__row:nth-child(189), .el-table__row:nth-child(190), .el-table__row:nth-child(212), .el-table__row:nth-child(213), .el-table__row:nth-child(235), .el-table__row:nth-child(236), .el-table__row:nth-child(258), .el-table__row:nth-child(259), .el-table__row:nth-child(281), .el-table__row:nth-child(282), .el-table__row:nth-child(304), .el-table__row:nth-child(305), .el-table__row:nth-child(327), .el-table__row:nth-child(328)
      td:nth-of-type(1)
        div
          background-color: #d0ecf5
          font-weight: bold

  .loanThroughRateInfo
    padding-top: 5px
    font-size: 12px
    color: red

</style>
