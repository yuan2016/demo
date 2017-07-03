<template>

  <div class="custom_table">
    <banner></banner>
    <!--<table class="table_content">-->
      <!--<tbody>-->
        <!--<tr v-for="(title,index) in headData" class="tr_item">-->
          <!--<th width="100" class="th_item">{{title}}</th>-->
          <!--<td class="td_item" v-for="data in tableData">{{data[name[index]]}}</td>-->
        <!--</tr>-->
      <!--</tbody>-->
    <!--</table>-->
    <div class="table_content">
      <ul class="table_item">
        <li class="li_item" v-for="title in headData">{{title}}</li>
      </ul>
      <ul class="table_item special" v-for="data in tableData"><li class="li_item" v-for="n in name">{{data[n]}}</li></ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../common/banner/banner'
  export default {
    data () {
      return {
        tableData: [],
        headData: ['注册时间', '姓名', '地址', '借款时间', '借款金额', '利息', '日均利息', '还款时间', '还款金额'],
        name: ['registe_time', 'username', 'city', 'borrow_date', 'amount', 'interest', 'per_day', 'payback_date', 'count']
      }
    },
    components: {
      banner
    },
    created () {
      this.axios.post('/api/cashManage').then((response) => {
        this.tableData = response.data
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.custom_table
  .table_content
    width: 100%
    display: flex
    .table_item
      flex:1
      &:hover
        background-color :#EEF1F6
      &>li:first-child
        background-color :#EEF1F6
        border-top :1px solid #dfe6ec
      .li_item
        padding: 10px 0 10px 20px
        border-bottom :1px solid #dfe6ec
        font-size: 14px
        color: #1f2d3d
        text-align :left
    .special>li:first-child
      font-weight :bold
</style>
