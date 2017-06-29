/**
 * Created by Administrator on 2017/6/27.
 */

// sql语句
var sqlMap = {
  // 用户
  customers: {
    select: 'select * from customers',
    city: 'select city from customers'
  },
  funds: {
    select: 'select * from funds'
  }
}
module.exports = sqlMap
