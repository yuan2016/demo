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

exports.formatCurrency = function (s, n) {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + ''
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
    for (var i = r.length; i < n; i++) {
      r += '0'
    }
  } else {
    r = r.substr(0, n)
  }
  return t.split('').reverse().join('') + '.' + r
}

exports.formatInt = function (s) {
  let result = []
  let counter = 0
  s = (s || 0).toString().split('')
  for (let i = s.length - 1; i >= 0; i--) {
    counter++
    result.unshift(s[i])
    if (!(counter % 3) && i !== 0) { result.unshift(',') }
  }
  return result.join('')
}

exports.mosaicName = function () {
  let time = new Date()
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()

  return y + add(m) + add(d) + add(h) + add(mm) + add(s) + '.xlsx'
}

function add (m) {
  return m < 10 ? '0' + m : m
}

exports.handleProperty = function (params) {
  let strs = []
  let arr = Object.entries(params)
  for (let i of arr) {
    if (i[1]) {
      let str = ' (' + i[0] + ' like "%' + i[1] + '%")'
      strs.push(str)
    }
  }
  let len = strs.length
  return strs.slice(0, len).join(' and ')
}
//startTime endTime
exports.handleTime = function (p, s, e) {
  let str
  if (!s && !e) {
    return ''
  } else if (!s && e) {
    str = '(' + p + '<="' + e + '")'
  } else if (s && !e) {
    str = '(' + p + '>="' + s + '")'
  } else {
    str = '(' + p + '>="' + s + '" and ' + p + '<="' + e + '")'
  }
  return str
}

exports.combine = function (a, b) {
  let combined = ''
  if (a && b) {
    combined = 'where ' + a + ' and ' + b
  } else if (a && !b) {
    combined = 'where ' + a
  } else if (!a && b) {
    combined = 'where ' + b
  }
  return combined
}
