<template>
  <div class="userStatistics">
    <div id="userStatistics-pic" style="width: 45%;height:250px;"></div>
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
      this.myChart = echarts.init(document.getElementById('userStatistics-pic'))
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
            text: '用户统计'
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
              data: ['总用户数', '全要素认证用户数', '绑卡用户总数', '运营商认证总数']
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
                      '#C1232B', '#B5C334', '#FCCE10', '#FF4500', '#27727B',
                      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
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
              data: ['2441656', '1492930', '1521850', '1526030']
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

  #userStatistics1
    display: inline-block

  #userStatistics2
    display: inline-block
</style>
