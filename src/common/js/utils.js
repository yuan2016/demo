/**
 * Created by Administrator on 2017/7/7.
 */
// 得到当前时间
export function getNowFormatDate () {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}

//格式化时间
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

//遍历对象得到属性值
export function getProperty (obj) {
  let values = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key) === true) {
      values.push(obj[key])
    }
  }
  return values
}

export function formatCurrency (s, n) {
  n = n > 0 && n <= 20 ? n : 2
  let k = false
  if (parseFloat(s) < 0) {
    k = true
  }
  s = parseFloat((Math.abs(s) + '').replace(/[^\d\.-]/g, '')) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  if (!r) {
    r = '0'
  }
  if (r.length < n) {
    for (let i = r.length; i < n; i++) {
      r += '0'
    }
  } else {
    r = r.substr(0, n)
  }
  let result = t.split('').reverse().join('') + '.' + r
  if (k) {
    result = '-' + result
  }
  return result
}

