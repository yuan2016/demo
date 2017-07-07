/**
 * Created by Administrator on 2017/7/7.
 */
// 得到当前时间
export function getNowFormatDate () {
  var date = new Date()
  var seperator = '-'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + seperator + month + seperator + strDate
  return currentdate
}

