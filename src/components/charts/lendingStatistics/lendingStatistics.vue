<template>
  <div class="lendingStatistics">
    <div id="lendingStatistics1" style="width: 45%;height:250px;"></div>
    <div id="lendingStatistics2" style="width: 45%;height:250px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  // 引入柱状图
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'

  export default {
    mounted () {
      this.myChart = echarts.init(document.getElementById('lendingStatistics1'))
      this.myChart1 = echarts.init(document.getElementById('lendingStatistics2'))
      this.initData()
    },
    data () {
      return {}
    },
    methods: {
      initData () {
        const option = {
          title: {
            x: 'right',
            text: '放款统计'
            //subtext: '单位(人)'
//            link: 'http://echarts.baidu.com/doc/example.html'
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
          },
          xAxis: [
            {
              type: 'category',
              show: false,
              data: ['累计放款金额', '当日放款金额', '放款中总金额', '放款失败金额']
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          series: [
            {
              name: '用户统计',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    // build a color map as your need.
                    var colorList = [
                      '#26C0C0', '#C1232B', '#FCCE10', '#E87C25', '#27727B',
                      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#C1232B', '#B5C334'
                    ]
                    return colorList[params.dataIndex]
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                  }
                }
              },
              data: [1196834700, 13220700, 687200, 5200]
            }
          ]
        }
        const option1 = {
          title: {
            //x: 'center',
            //text: '放款统计'
            //subtext: '单位(人)'
//            link: 'http://echarts.baidu.com/doc/example.html'
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
          },
          xAxis: [
            {
              type: 'category',
              show: false,
              data: ['累计放款笔数', '当日放款笔数', '放款中笔数', '放款失败笔数']
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          series: [
            {
              name: '用户统计',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    // build a color map as your need.
                    var colorList = [
                      '#F4E001', '#F0805A', '#C1232B', '#B5C334',
                      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#C6E579'
                    ]
                    return colorList[params.dataIndex]
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                  }
                }
              },
              data: [646046, 5847, 304, 2]
            }
          ]
        }

        this.myChart.setOption(option)
        this.myChart1.setOption(option1)
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
