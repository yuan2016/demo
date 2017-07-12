/**
 * Created by Administrator on 2017/7/11.
 */
exports.analysis = function (params) {
  let queries = []
  for (let param in params) {
    let query
    if (params[param] === '') {
      query = '(' + param + ' IS NULL OR ' + param + ' LIKE "%%")'
    } else {
      query = param + '="' + params[param] + '"'
    }
    queries.push(query)
  }
  return queries
}

