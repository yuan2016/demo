// sql语句
var sqlMap = {
  // 登陆
  login: {
    select: 'select password from user where name=?'
  },
  //数据分析
  dataAnalysis: {
    //每日还款金额数据
    selectAll: 'select * from ?? where d_date between ? and ? limit ?,?',
    getCount: 'select count(*) as count from ?? where d_date between ? and ?'
  }
}
module.exports = sqlMap
