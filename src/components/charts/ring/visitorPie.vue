<template>
  <div class="visitorpie">
    <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  // 引入柱状图
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  export default {
    mounted () {
      this.myChart = echarts.init(document.getElementById('visitorpie'))
      this.initData()
    },
    data () {
      return {
        pieData: {beijing: 2, shanghai: 1, shenzhen: 3, hangzhou: 10, qita: 3}
      }
    },
    methods: {
      initData () {
        let dataStyle = {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        }
        let placeHolderStyle = {
          normal: {
            color: 'rgba(0,0,0,0)',
            label: {show: false},
            labelLine: {show: false}
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        }
        const option = {
          title: {
            text: '你幸福吗？',
            subtext: 'From ExcelHome',
            sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle: {
              color: 'rgba(30,144,255,0.8)',
              fontFamily: '微软雅黑',
              fontSize: 35,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            show: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: document.getElementById('visitorpie').offsetWidth / 2,
            y: 45,
            itemGap: 12,
            data: ['68%的人表示过的不错', '29%的人表示生活压力很大', '3%的人表示“我姓曾”']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '1',
              type: 'pie',
              clockWise: false,
              radius: [125, 150],
              itemStyle: dataStyle,
              data: [
                {
                  value: 68,
                  name: '68%的人表示过的不错'
                },
                {
                  value: 32,
                  name: 'invisible',
                  itemStyle: placeHolderStyle
                }
              ]
            },
            {
              name: '2',
              type: 'pie',
              clockWise: false,
              radius: [100, 125],
              itemStyle: dataStyle,
              data: [
                {
                  value: 29,
                  name: '29%的人表示生活压力很大'
                },
                {
                  value: 71,
                  name: 'invisible',
                  itemStyle: placeHolderStyle
                }
              ]
            },
            {
              name: '3',
              type: 'pie',
              clockWise: false,
              radius: [75, 100],
              itemStyle: dataStyle,
              data: [
                {
                  value: 3,
                  name: '3%的人表示“我姓曾”'
                },
                {
                  value: 97,
                  name: 'invisible',
                  itemStyle: placeHolderStyle
                }
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
  .visitorpie
    display: flex
    justify-content: center
    margin-top: 20px
</style>
