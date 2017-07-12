// sql语句
var sqlMap = {
  // 登陆
  login: {
    select: 'select password from user where name=?'
  },
  //用户信息管理
  userInformationManagement: {
    userList: {
      // getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, realname, company_name, user_phone, id_number, user_sex, CASE WHEN STATUS = 2 THEN "是" ELSE "否" END as status, create_time from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    userAddressBook: {
      // getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, user_id, user_name, contact_name, contact_phone, create_time from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    bankcardsList: {
      // getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, user_id, open_name, phone, bank_name, card_no, CASE WHEN MAIN_CARD = 0 THEN "是" ELSE "否" END as main_card, CASE WHEN TYPE = 1 THEN "信用卡" WHEN TYPE = 2 THEN "借记卡" ELSE "对公账号" END as type,CASE WHEN STATUS = 0 THEN "无效" ELSE "生效" END as card_status,create_time FROM ?? where ',
      selectAllBack: ' limit ?,?'
    },
    userNameAuthenticationList: {
      // getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, realname, id_number, create_time, update_time from ?? where ',
      selectAllBack: ' limit ?,?'
    }
  },
  //数据分析
  dataAnalysis: {
    //每日还款金额数据
    selectAll: 'select * from ?? where d_date between ? and ? limit ?,?',
    getCount: 'select count(*) as count from ?? where d_date between ? and ?'
  }
}
module.exports = sqlMap
