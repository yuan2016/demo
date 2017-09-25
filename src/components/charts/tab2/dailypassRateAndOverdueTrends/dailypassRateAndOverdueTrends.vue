<template>
  <div class="dailypassRateAndOverdueTrends">
    <div id="dailypassRateAndOverdueTrends-pic" style="width: 100%;height: 300px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  // 引入柱状图
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/dataZoom'

  export default {
    mounted () {
      this.myChart = echarts.init(document.getElementById('dailypassRateAndOverdueTrends-pic'))
      this.initData()
    },
    data () {
      return {}
    },
    methods: {
      initData () {
        const option = {
          //标题
          title: {
            text: '通过率/逾期率日趋势',
            left: 'center',
            textStyle: {
              color: '#666',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 14
            }
          },
          //背景
          backgroundColor: '#fff',
          //提示框组件
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br />{a0}: {c0}<br />',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            x: '1%',
            y: 50,
            x2: '6%',
            y2: 20,
            containLabel: true
          },
          //图例组件，颜色和名字
          legend: {
            right: 10,
            top: 0,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            data: [{
              name: '通过率(%)'
            }, {
              name: '逾期率(%)'
            }],
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          //横轴
          xAxis: [
            {
              show: true,
              type: 'category',
              boundaryGap: true,
              //坐标轴两边留白
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
              axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,
                //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                  color: '#078ceb',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12

                }
              },
              //坐标轴刻度相关设置。
              axisTick: {
                show: true,
                alignWithLabel: true
              },
              //坐标轴轴线相关设置
              axisLine: {
                lineStyle: {
                  color: '#3E98C5',
                  opacity: 0.8
                }
              },
              //坐标轴在 grid 区域中的分隔线。
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              position: 'left',
              name: '通过率(%)',
              type: 'value',
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#3E98C5',
                  opacity: 0.8
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#3E98C5'],
                  opacity: 0.2
                }
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: [
                    'rgba(250,250,250,0.3)',
                    'rgba(200,200,200,0.1)'
                  ]
                }
              }
            },
            {
              position: 'right',
              name: '逾期率(%)',
              type: 'value',
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#3E98C5',
                  opacity: 0.8
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#3E98C5'],
                  opacity: 0.2
                }
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: [
                    'rgba(250,250,250,0.3)',
                    'rgba(200,200,200,0.1)'
                  ]
                }
              }
            }
          ],
          //数据区域缩放
          dataZoom: [
            {
              show: false,
              height: 20,
              xAxisIndex: [0],
              bottom: 0,
              type: 'slider',
              start: 50,
              end: 100,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#9B4E4E'
              }
            },
            {
              show: true,
              type: 'inside',
              height: 15,
              start: 1,
              end: 35
            }
          ],
          series: [
            {
              name: '通过率(%)',
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: '#3CB371',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : ''
                    }
                  }
                }
              },
              data: ['7.0', '13.3', '13.6', '8.3', '13.4', '10.2', '5.4', '6.3', '10.8', '12.4', '8.7', '7.3', '10.0', '7.0', '13.3', '13.6', '8.3', '13.4', '10.2', '5.4', '6.3', '10.8', '12.4', '8.7']
            }, {
              name: '逾期率(%)',
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: '#F08080',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : ''
                    }
                  }
                }
              },
              data: ['3.0', '17.3', '3.6', '18.3', '3.4', '1.2', '15.4', '16.3', '1.8', '2.4', '18.7', '17.3', '1.0', '17.0', '3.3', '3.6', '13.3', '3.4', '1.2', '15.4', '16.3', '3.8', '2.4', '13.7']
            }]
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
  .dailypassRateAndOverdueTrends
    width: 100%
    height: 100%
</style>
