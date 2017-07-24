<template>
  <div class="riskControlStatistics">
    <div id="riskControlStatistics" style="width: 90%;height:250px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'

  export default {
    mounted () {
      this.myChart = echarts.init(document.getElementById('riskControlStatistics'))
      this.initData()
    },
    data () {
      return {}
    },
    methods: {
      initData () {
        let labelTop = {
          normal: {
            label: {
              show: true,
              position: 'center',
              formatter: '{b}',
              textStyle: {
                baseline: 'bottom'
              }
            },
            labelLine: {
              show: false
            }
          }
        }
        let labelFromatter = {
          normal: {
            label: {
              formatter: function (params) {
                return 100 - params.value + '%'
              },
              textStyle: {
                baseline: 'top'
              }
            }
          }
        }
        let labelBottom = {
          normal: {
            color: '#ccc',
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        }
        const radius = [60, 80]
        const option = {
          legend: {},
          title: {
            text: '风控统计',
            //subtext: 'from global web index',
            x: '44.6%'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    width: '20%',
                    height: '30%',
                    itemStyle: {
                      normal: {
                        label: {
                          formatter: function (params) {
                            return 'other\n' + params.value + '%\n'
                          },
                          textStyle: {
                            baseline: 'middle'
                          }
                        }
                      }
                    }
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              type: 'pie',
              center: ['10%', '50%'],
              radius: radius,
              x: '0%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 46, itemStyle: labelBottom},
                {name: '机审订单通过率', value: 54, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['37%', '50%'],
              radius: radius,
              x: '20%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 56, itemStyle: labelBottom},
                {name: '今日机审通过率', value: 44, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['63%', '50%'],
              radius: radius,
              x: '40%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 65, itemStyle: labelBottom},
                {name: '今日老用户通过率', value: 35, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['90%', '50%'],
              radius: radius,
              x: '60%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 70, itemStyle: labelBottom},
                {name: '今日新用户通过率', value: 30, itemStyle: labelTop}
              ]
            }
          ]
        }

        this.myChart.setOption(option)
      }
    },
    watch: {
      pieData: function () {
        this.initData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #lendingStatistics1
    display: inline-block

  #lendingStatistics2
    display: inline-block
</style>
