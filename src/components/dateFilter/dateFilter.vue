<template>
  <div class="date-filter">
    <el-date-picker
      v-model="value0"
      type="date"
      placeholder="从"
      :picker-options="pickerOptions0">
    </el-date-picker>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="到"
      :picker-options="pickerOptions1">
    </el-date-picker>
    <el-button type="primary" @click.prevent.stop="onClickMe">搜索</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      value0: '',
      value1: ''
    }
  },
  methods: {
    onClickMe: function () {
      this.$emit('child-say', [this.value0, this.value1])
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.date-filter
  padding:15px 0 15px 1px
</style>
