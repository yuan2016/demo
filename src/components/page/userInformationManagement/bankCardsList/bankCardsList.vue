<template>
  <div class="bankCardsList" v-loading.body="loading" element-loading-text="拼命加载中">
    <banner></banner>
    <ul class="date-filter">
      <li>
        <span class="managerFront">借款人ID：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="user_id"></el-input>
        <span class="managerFront">持卡人姓名：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="open_name"></el-input>
        <span class="managerFront">手机号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="phone"></el-input>
      </li>
      <li>
        <span class="managerFront">银行卡号：</span>
        <el-input size="small" type="text" placeholder="请输入内容" class="managerText" v-model.trim="card_no"></el-input>
        <span class="managerFront">添加时间：</span>
        <el-date-picker v-model.trim="startTime" type="date" size="small" placeholder="从"
                        class="userListTimeSelect"></el-date-picker>
        <el-date-picker v-model.trim="endTime" type="date" size="small" placeholder="到"
                        class="userListTimeSelect"></el-date-picker>
        <span class="managerFront">状态：</span>
        <el-select v-model.trim="status" size="small" placeholder="不限" class="userListSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="userButton" @click.prevent.stop="search">搜索</el-button>
      </li>
    </ul>
    <el-table :data="fundData" highlight-current-row border stripe height="500" style="width: 100%;overflow: auto">
      <el-table-column property="id" label="ID" width="80px"></el-table-column>
      <el-table-column property="user_id" label="借款人ID" width="80px"></el-table-column>
      <el-table-column property="open_name" label="持卡人姓名"></el-table-column>
      <el-table-column property="phone" label="手机号"></el-table-column>
      <el-table-column property="bank_name" label="银行名称"></el-table-column>
      <el-table-column property="card_no" label="银行卡号" width="150px"></el-table-column>
      <el-table-column property="main_card" label="是否主卡" width="80px"></el-table-column>
      <el-table-column property="type" label="卡片类型"></el-table-column>
      <el-table-column property="card_status" label="状态"></el-table-column>
      <el-table-column property="create_time" sortable label="添加时间"width="140px"></el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px;" v-show="fundData.length!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        :layout="pageContent"
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
        user_id: '',
        open_name: '',
        phone: '',
        card_no: '',
        status: '',
        startTime: '',
        endTime: '',
        isShowPage: false,
        pageContent: 'sizes',
        loading: false,
        fundData: [],
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        options: [{
          value: '',
          label: '不限'
        }, {
          value: '1',
          label: '生效'
        }, {
          value: '0',
          label: '无效'
        }]
      }
    },
    components: {
      banner
    },
    created () {
      this.loading = true
      this.getDataInit()
    },
    methods: {
      //每页显示数据量变更
      handleSizeChange (val) {
        this.limit = val
        this.loading = true
        this.getDataInit()
      },
      //页码变更
      handleCurrentChange (val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.loading = true
        this.getDataInit()
      },
      getDataInit () {
        this.axios.post('/api/bankcardsList', {
          user_id: this.user_id,
          open_name: this.open_name,
          phone: this.phone,
          card_no: this.card_no,
          status: this.status,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        }).then((response) => {
          if (response.data.code === '404') {
            this.$router.push('./404')
          } else if (response.data.code === '1024') {
            this.fundData = []
            this.loading = false
            this.$message({
              message: '请求超时，请增加搜索条件以便搜索',
              type: 'warning'
            })
          } else {
            this.fundData = response.data
            this.loading = false
          }
        }).catch(() => {
          this.fundData = []
          this.loading = false
          this.$message.error('搜索出现错误，请重试')
        })
      },
      getData () {
        return this.axios.post('/api/bankcardsList', {
          user_id: this.user_id,
          open_name: this.open_name,
          phone: this.phone,
          card_no: this.card_no,
          status: this.status,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      getCount () {
        return this.axios.post('/api/bankcardsList/count', {
          user_id: this.user_id,
          open_name: this.open_name,
          phone: this.phone,
          card_no: this.card_no,
          status: this.status,
          startTime: this.startTime || '1991-07-22',
          endTime: this.endTime || getNowFormatDate(),
          limit: this.limit,
          offset: this.offset
        })
      },
      search () {
        this.loading = true
        this.pageContent = ''
        if (this.user_id === '' && this.open_name === '' && this.phone === '' && this.card_no === '' && this.status === '' && this.startTime === '' && this.endTime === '') {
          this.isShowPage = false
          this.pageContent = 'sizes'
          this.getDataInit()
        } else {
          if (this.startTime !== '') {
            this.startTime = formatDate(new Date(this.startTime), 'yyyy-MM-dd')
          }
          if (this.endTime !== '') {
            this.endTime = formatDate(new Date(this.endTime), 'yyyy-MM-dd')
          }
          this.isShowPage = true
          this.axios.all([this.getCount(), this.getData()])
            .then(this.axios.spread((acct, perms) => {
              if (perms.data.code === '404' || acct.data.code === '404') {
                this.$router.push('./404')
              } else if (perms.data.code === '1024' || acct.data.code === '1024') {
                this.fundData = []
                this.loading = false
                this.$message({
                  message: '请求超时，请增加搜索条件以便搜索',
                  type: 'warning'
                })
              } else {
                this.count = acct.data[0].count
                this.fundData = perms.data
                this.loading = false
                this.pageContent = 'total, sizes, prev, pager, next, jumper'
              }
            })).catch(() => {
            this.fundData = []
            this.loading = false
            this.$message.error('搜索出现错误，请重试')
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.bankCardsList
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
      font-size: 14px
      width: 90px
      text-align:right
      color: #666
    .managerText
      width: 188px
    .userButton
      margin-left: 5px
    .userListTimeSelect
      width: 120px
    .userListSelect
      width: 80px


  .el-table .cell, .el-table th > div
    padding-left: 0
    padding-right: 0
    text-align: center
    font-size: 12px

  .el-table th > .cell
    text-align: center
    font-weight: bold
</style>
