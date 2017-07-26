<template>
  <div class="loanApplicationsList">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">订单号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText"
                  v-model.trim="out_trade_no"></el-input>
        <span class="managerFront">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
      </li>
      <li>
        <span class="managerFront">用户类型：</span>
        <el-select v-model.trim="customer_type" size="small" placeholder="不限" class="loanAppSelect">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="managerFront">状态：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="loanAppSelectLong">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="loanAppButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table stripe v-loading.body="loading" class="userTable" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border style="width: 100%;overflow: auto">
      <el-table-column property="out_trade_no" label="订单号" width="150px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="money_amount" label="借款金额(元)"></el-table-column>
      <el-table-column property="into_money" label="到账金额(元)"></el-table-column>
      <el-table-column property="loan_term" label="借款期限(天)"></el-table-column>
      <el-table-column property="apr" label="服务费利率(万分之一)" width="130px"></el-table-column>
      <el-table-column property="loan_interests" label="服务费(元)"></el-table-column>
      <el-table-column property="sjloan_urgent_fee" label="加急费(元)"></el-table-column>
      <el-table-column property="order_time" sortable label="申请时间" width="130px"></el-table-column>
      <el-table-column property="verify_loan_time" sortable label="放款时间" width="130px"></el-table-column>
      <el-table-column property="updated_at" sortable label="更新时间" width="130px"></el-table-column>
      <el-table-column property="child_type" label="子类型"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center;margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="sizes"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../../../common/banner/banner'

  export default {
    data () {
      return {
        out_trade_no: '',
        realname: '',
        user_phone: '',
        status: '',
        customer_type: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        options1: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '新用户'
        }, {
          value: '1',
          label: '老用户'
        }],
        options2: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '待初审'
        }, {
          value: '-3',
          label: '初审驳回'
        }, {
          value: '1',
          label: '初审通过'
        }, {
          value: '-4',
          label: '复审驳回'
        }, {
          value: '20',
          label: '复审通过,待放款'
        }, {
          value: '-5',
          label: '放款驳回'
        }, {
          value: '22',
          label: '放款中'
        }, {
          value: '-10',
          label: '放款失败'
        }, {
          value: '21',
          label: '已放款，还款中'
        }, {
          value: '23',
          label: '部分还款'
        }, {
          value: '30',
          label: '已还款'
        }, {
          value: '-11',
          label: '已逾期'
        }, {
          value: '-20',
          label: '已坏账'
        }, {
          value: '34',
          label: '逾期已还款'
        }]
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getData()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getData()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getData()
      },
      getData () {
        this.axios.post('/api/loanApplicationsList', {
          out_trade_no: this.out_trade_no,
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          customer_type: this.customer_type,
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          console.log(response.data)
          this.fundData = response.data
          this.loading = false
        })
      },
      search () {
        this.loading = true
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loanApplicationsList
  height: 100%
  .date-filter
    padding: 15px 0 15px 1px
    height: 8%
    li
      margin-bottom :5px
    .managerFront
      padding-left: 5px
      font-size: 14px
      color: #666
    .managerText
      width: 188px
    .loanAppButton
      margin-left: 5px
    .loanAppSelect
      width: 100px
    .loanAppSelectLong
      width: 150px

  /*.el-col-4*/
  /*width: 15.66667%*/

  /*.el-col-20*/
  /*width: 84.33333%*/
  .userTable
    height: 70%
  .pagination
    padding-top :1.5%

  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
