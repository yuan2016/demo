<template>
  <div class="channelRejectedReason">
    <div id="channelRejectedReason-pic" style="width: 100%;height: 335px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  // 引入柱状图
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/dataZoom'

  export default {
    mounted () {
      this.myChart = echarts.init(document.getElementById('channelRejectedReason-pic'))
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
            text: '各渠道最主要被拒原因',
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
            y2: 0,
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
              name: '1天'
            },
              {
                name: '1周'
              },
              {
                name: '1月'
              }
            ],
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
              data: ['7.23', '7.30', '8.06', '8.13', '8.20', '8.27', '9.03', '9.10', '9.17', '9.24'],
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
              start: 30,
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
              name: '1天',
              type: 'bar',
              data: [4.9, 7.3, 9.2, 5.6, 7.7, 5.6, 4.2, 3.6, 6, 6.4],
              barWidth: 15,
              barGap: 0,
              //柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                  }, {
                    offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                  }, {
                    offset: 0.31, color: 'rgba(0, 208, 208, 0.7)'
                  }, {
                    offset: 0.15, color: 'rgba(0, 208, 208, 0.7)'
                  }, {
                    offset: 0, color: 'rgba(104, 253, 255, 0.7)'
                  }], false)
                }
              }
            },
            {
              name: '1周',
              type: 'bar',
              data: [2.9, 5, 4.4, 2.7, 5.7, 4.6, 1.2, 2.7, 4.8, 6.0, 3.5, 2.5, 4.5],
              barWidth: 15,
              barGap: 0.2,
              //柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                  }, {
                    offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                  }, {
                    offset: 0.25, color: 'rgba(226, 99, 74, 0.7)'
                  }, {
                    offset: 0, color: 'rgba(253, 200, 106, 0.7)'
                  }], false)
                }
              }
            },
            {
              name: '1月',
              type: 'bar',
              barWidth: 15,
              barGap: 0.2,
              //柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1, color: 'rgba(0,139,139, 0.7)'
                  }, {
                    offset: 0.9, color: 'rgba(25,25,112, 0.7)'
                  }, {
                    offset: 0.25, color: 'rgba(189,183,107, 0.7)'
                  }, {
                    offset: 0, color: 'rgba(0,191,255, 0.7)'
                  }], false),
                  barBorderRadius: [5, 5, 0, 0],
                  label: {
                    show: true,
                    position: 'top',
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : ''
                    }
                  }
                }
              },
              data: ['7.0', '13.3', '13.6', '8.3', '13.4', '10.2', '5.4', '6.3', '10.8', '12.4', '8.7', '7.3', '10.0']
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
  .channelRejectedReason
    width: 100%
    height: 100%
</style>
