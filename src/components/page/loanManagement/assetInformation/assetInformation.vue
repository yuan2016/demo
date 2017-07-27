<template>
  <div class="assetInformation">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="realname"></el-input>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_phone"></el-input>
        <span class="managerFront">放款时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="assetInformationTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="assetInformationTimeSelect"></el-date-picker>
      </li>
      <li>
        <span class="managerFront">状态：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="assetInfoSelect">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="managerFront">资产所属：</span>
        <el-select v-model.trim="assets_owned" size="small" disabled placeholder="招财猫" class="assetInfoSelect">
        </el-select>
        <span class="managerFront">资产类别：</span>
        <el-select v-model.trim="credit_lv" size="small" placeholder="不限" class="assetInfoSelectLong">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="loanAuditButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table stripe v-loading.body="loading" element-loading-text="拼命加载中" :data="fundData" highlight-current-row border style="width: 100%;overflow:auto;" height="500">
      <el-table-column property="asset_order_id" label="订单号" width="150px"></el-table-column>
      <el-table-column property="realname" label="姓名"></el-table-column>
      <el-table-column property="user_phone" label="手机号"></el-table-column>
      <el-table-column property="customer_type" label="用户类型"></el-table-column>
      <el-table-column property="money_amount" label="借款金额(元)"></el-table-column>
      <el-table-column property="loan_term" label="借款期限" width="170px"></el-table-column>
      <el-table-column property="apr" label="服务费利率(万分之一)" width="150px"></el-table-column>
      <el-table-column property="loan_interests" label="服务费(元)"></el-table-column>
      <el-table-column property="order_time" sortable label="下单时间"width="130px"></el-table-column>
      <el-table-column property="loan_time" sortable label="放款时间"width="130px"></el-table-column>
      <el-table-column property="updated_at" sortable label="更新时间"width="130px"></el-table-column>
      <el-table-column property="assets_owned" label="资产所属"></el-table-column>
      <el-table-column property="credit_lv" label="资产类别"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="pay_remark" label="备注"></el-table-column>

    </el-table>
    <div style="text-align: center;margin-top: 10px;">
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
  import { getNowFormatDate, formatDate } from '../../../../common/js/utils'

  export default {
    data () {
      return {
        realname: '',
        user_phone: '',
        assets_owned: '招财猫',
        credit_lv: '',
        fundData: [],
        loading: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        startTime: '',
        endTime: '',
        status: '',
        options1: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '待推送'
        }, {
          value: '1',
          label: '推送中'
        }, {
          value: '2',
          label: '推送成功'
        }, {
          value: '3',
          label: '推送失败'
        }],
        options2: [{
          value: '',
          label: '不限'
        }, {
          value: '0',
          label: '未知'
        }, {
          value: '1',
          label: 'A类'
        }, {
          value: '2',
          label: 'B类'
        }, {
          value: '3',
          label: 'C类'
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
        this.axios.post('/api/assetInformation', {
          realname: this.realname,
          user_phone: this.user_phone,
          status: this.status,
          credit_lv: this.credit_lv,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
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
        if (this.startTime !== '') {
          this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
        }
        if (this.endTime !== '') {
          this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
        }
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .assetInformation
    height: 100%
    .date-filter
      padding: 15px 0 15px 1px
      box-sizing border-box
      height 90px
      li
        margin-bottom :5px
      .managerFront
        display: inline-block
        padding-left: 5px
        width: 70px
        text-align:right
        font-size: 14px
        color: #666
      .managerText
        width: 160px
      .loanAuditButton
        margin-left: 5px
      .assetInfoSelect
        width: 160px
      .assetInfoSelectLong
        width: 232px
      .assetInformationTimeSelect
        width: 140px

    .el-table .cell, .el-table th > div
      padding-left: 0
      padding-right: 0
      text-align: center
      font-size: 12px

    .el-table th > .cell
      text-align: center
      font-weight: bold
</style>
