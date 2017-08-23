<template>
  <div class="loanOverdueRecallRate" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <div class="date-filter">
      <span class="managerFront">借款类型：</span>
      <el-select v-model.trim="loan_term" size="small" placeholder="14天" class="loanOverdueRecallRateSelect"
                 @change="search">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table :data="fundData" highlight-current-row border
              style="width: 100%;overflow: auto;" :height="height" class="loanOverdueRecallRateTable">
      <el-table-column property="AA" :label="labels[1]" width="160px"></el-table-column>
      <el-table-column property="D1" :label="labels[2]"></el-table-column>
      <el-table-column property="D2" :label="labels[3]"></el-table-column>
      <el-table-column property="D3" :label="labels[4]"></el-table-column>
      <el-table-column property="D4" :label="labels[5]"></el-table-column>
      <el-table-column property="D5" :label="labels[6]"></el-table-column>
      <el-table-column property="D6" :label="labels[7]"></el-table-column>
      <el-table-column property="D7" :label="labels[8]"></el-table-column>
      <el-table-column property="D8" :label="labels[9]"></el-table-column>
      <el-table-column property="D9" :label="labels[10]"></el-table-column>
      <el-table-column property="D10" :label="labels[11]"></el-table-column>
      <el-table-column property="DOD" :label="labels[12]"></el-table-column>
      <el-table-column property="W1" :label="labels[13]"></el-table-column>
      <el-table-column property="W2" :label="labels[14]"></el-table-column>
      <el-table-column property="W3" :label="labels[15]"></el-table-column>
      <el-table-column property="W4" :label="labels[16]"></el-table-column>
      <el-table-column property="WOW" :label="labels[17]"></el-table-column>
      <el-table-column property="M1" :label="labels[18]"></el-table-column>
      <el-table-column property="M2" :label="labels[19]"></el-table-column>
      <el-table-column property="M3" :label="labels[20]"></el-table-column>
      <el-table-column property="MOM" :label="labels[21]"></el-table-column>
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
  import banner from '../../../common/banner/banner'
  import { getProperty } from '../../../../common/js/utils'
  import { getHeight } from '../../../../common/js/storage'
  import $ from 'jquery'

  const defaultBlank = ['', '指标名称', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DOD', 'W1', 'W2', 'W3', 'W4', 'WOW', 'M1', 'M2', 'M3', 'MOM']

  export default {
    data () {
      return {
        labels: [],
        fundData: [],
        loading: false,
        height: 500,
        loan_term: '14',
        options: [{
          value: '14',
          label: '14天'
        }, {
          value: '1',
          label: 'F1分期'
        }, {
          value: '2',
          label: 'F2分期'
        }, {
          value: '3',
          label: 'F3分期'
        }]
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.height = parseInt(getHeight())
      this.getData()
    },
    methods: {
      getData () {
        this.axios.post('/api/loanOverdueRecallRate', {loan_term: this.loan_term}).then((response) => {
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
            this.fundData = response.data.slice(1)
            if (this.fundData.length === 0) {
              this.labels = defaultBlank
              this.loading = false
            } else {
              this.labels = getProperty(response.data[0])
              console.log(this.labels)
              console.log(this.fundData)
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
      }
    },
    updated () {
      let backcolor = [0, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37]
      if ($('.el-table__row').length > 0) {
        let clientWidth = document.documentElement.clientWidth
        $('.el-table__header>thead>tr>th:eq(11)>div.cell').on('mouseover', function (event) {
          let x = clientWidth - event.clientX
          let y = event.clientY - 50
          $('.pop1').css('display', 'block').css('top', y).css('right', x)
        }).on('mouseout', function () {
          $('.pop1').css('display', 'none')
        })
        $('.el-table__header>thead>tr>th:eq(16)>div.cell').on('mouseover', function () {
          let x = clientWidth - event.clientX
          let y = event.clientY - 50
          $('.pop2').css('display', 'block').css('top', y).css('right', x)
        }).on('mouseout', function () {
          $('.pop2').css('display', 'none')
        })
        $('.el-table__header>thead>tr>th:eq(20)>div.cell').on('mouseover', function () {
          let x = clientWidth - event.clientX
          let y = event.clientY - 50
          $('.pop3').css('display', 'block').css('top', y).css('right', x)
        }).on('mouseout', function () {
          $('.pop3').css('display', 'none')
        })
        for (let i of backcolor) {
          $('.el-table__row:eq(' + i + ')>td:eq(0)').css('background-color', '#93c2d2')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loanOverdueRecallRate
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 60px
      .managerFront
        display: inline-block
        padding-left: 5px
        font-size: 14px
        color: #666
      .loanOverdueRecallRateSelect
        width: 100px
    .pop1
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow : 5px 5px 5px #999
    .pop2
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow : 5px 5px 5px #999
    .pop3
      display: none
      position: absolute
      padding: 5px
      border: 1px solid #cccccc
      border-radius: 5px
      font-size: 12px
      background-color: #fff
      box-shadow : 5px 5px 5px #999

    .popTop
      padding-bottom: 5px
    /*.loanOverdueRecallRateTable*/
    /*.el-table__row:nth-child(1), .el-table__row:nth-child(2), .el-table__row:nth-child(5), .el-table__row:nth-child(8), .el-table__row:nth-child(11), .el-table__row:nth-child(14), .el-table__row:nth-child(17), .el-table__row:nth-child(20), .el-table__row:nth-child(23), .el-table__row:nth-child(26), .el-table__row:nth-child(29), .el-table__row:nth-child(32), .el-table__row:nth-child(35), .el-table__row:nth-child(38)*/
    /*td:nth-of-type(2)*/
    /*div*/
    /*background-color: #ADD8E6*/
    /*font-weight: bold*/

    .loanOverdueRecallRateInfo
      padding-top: 5px
      font-size: 12px
      color: red
</style>
