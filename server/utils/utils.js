/**
 * Created by Administrator on 2017/7/11.
 */
exports.analysis = function (params, table) {
  let queries = []
  for (let param in params) {
    let query
    if (table) {
      if (params[param] === '') {
        query = '(' + table + '.' + param + ' IS NULL OR ' + table + '.' + param + ' LIKE "%%")'
      } else {
        query = '(' + table + '.' + param + '="' + params[param] + '")'
      }
    } else {
      if (params[param] === '') {
        query = '(' + param + ' IS NULL OR ' + param + ' LIKE "%%")'
      } else {
        query = '(' + param + '="' + params[param] + '")'
      }
    }
    queries.push(query)
  }
  return queries
}

exports.complexMosaic = function (params, key, value, table) {
  let add
  if (table) {
    if (params[key]) {
      if (params[key] === value) {
        add = ' and (' + table + '.' + key + ' = "' + value + '")'
      } else {
        add = ' and (' + table + '.' + key + ' <> "' + value + '")'
      }
    } else {
      add = ' and (' + table + '.' + key + ' IS NULL OR ' + table + '.' + key + ' LIKE "%%")'
    }
  } else {
    if (params[key]) {
      if (params[key] === value) {
        add = ' and (' + key + ' = "' + value + '")'
      } else {
        add = ' and (' + key + ' <> "' + value + '")'
      }
    } else {
      add = ' and (' + key + ' IS NULL OR ' + key + ' LIKE "%%")'
    }
  }
  return add
}

exports.mosaic = function (params, key, table) {
  let add
  if (table) {
    if (params[key]) {
      add = ' and (' + table + '.' + key + ' = "' + params[key] + '")'
    } else {
      add = ' and (' + table + '.' + key + ' IS NULL OR ' + table + '.' + key + ' LIKE "%%")'
    }
  } else {
    if (params[key]) {
      add = ' and (' + key + ' = "' + params[key] + '")'
    } else {
      add = ' and (' + key + ' IS NULL OR ' + key + ' LIKE "%%")'
    }
  }
  return add
}

exports.formatCurrency = function (num) {
  if (parseInt(num) === num) {
    let result = []
    let counter = 0
    num = (num || 0).toString().split('')
    for (let i = num.length - 1; i >= 0; i--) {
      counter++
      result.unshift(num[i])
      if (!(counter % 3) && i !== 0) { result.unshift(',') }
    }
    return result.join('')
  } else {
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num)) {
      num = '0'
    }
    let sign = (num === (num = Math.abs(num) + ''))
    num = Math.floor(num * 100 + 0.50000000001)
    let cents = num % 100
    num = Math.floor(num / 100).toString()
    if (cents < 10) {
      cents = '0' + cents
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3))
    }
    return (((sign) ? '' : '-') + num + '.' + cents)
  }
}
