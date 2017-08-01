// sql语句
var sqlMap = {
  // 登陆
  login: {
    select: 'select user_password from ?? where user_email = ?'
  },
  //首页
  main: {
    selectAll: 'select * from ??'
  },
  //用户信息管理
  userInformationManagement: {
    userList: {
      getCount: 'select count(*) as count from ?? where (create_time between ? and ?) and ',
      selectAllFront: 'select id, realname, company_name, user_phone, id_number, DATE(SUBSTR(ID_NUMBER,7,8)) as birthday, user_sex, CASE WHEN STATUS = 2 THEN "是" WHEN STATUS = 1 then "否" END as status, create_time from ?? where (create_time between ? and ?) and ',
      selectAllBack: ' ORDER BY create_time desc limit ?,?'
    },
    userAddressBook: {
      getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, user_id, user_name, contact_name, contact_phone, create_time from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    bankcardsList: {
      getCount: 'select count(*) as count from ?? where (create_time between ? and ?) and ',
      selectAllFront: 'select id, user_id, open_name, phone, bank_name, card_no, CASE WHEN MAIN_CARD = 0 THEN "是" ELSE "否" END as main_card, CASE WHEN TYPE = 1 THEN "信用卡" WHEN TYPE = 2 THEN "借记卡" ELSE "对公账号" END as type,CASE WHEN STATUS = 0 THEN "无效" WHEN STATUS = 1 THEN "生效" END as card_status,create_time FROM ?? where (create_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    userNameAuthenticationList: {
      getCount: 'select count(*) as count from ?? where (REALNAME_STATUS=1) and ',
      selectAllFront: 'select id, realname, id_number, create_time, update_time from ?? where (REALNAME_STATUS=1) and ',
      selectAllBack: ' limit ?,?'
    },
    userAuthenticationList: {
      getCount: 'select count(*) as count from ?? a left join ?? b on a.id=b.user_id where ',
      selectAllFront: 'select a.id user_id, a.realname, a.user_name user_phone, case when a.pay_password is not null then "是" else "否" end auth_pay_password, case when a.id_number is not null then "是" else "否" end auth_id_number, case when a.company_name is not null and a.company_address is not null then "是" else "否" end auth_company,case when a.first_contact_name is not null and a.first_contact_phone is not null then "是" else "否" end auth_contact, case when b.card_no is not null then "是" else "否" end auth_card , case when a.zm_status=2 then "是" else "否" end auth_zm, case when a.jxl_status=2 then "是" else "否" end auth_jxl, case when a.qq is not null or a.wechat_account is not null or a.email is not null then "是" else "否" end auth_more, case when a.my_hb_time is not null then "是" else "否" end auth_zfb, case when a.taobao_account is not null then "是" else "否" end auth_taobao from ?? a left join ?? b on a.id=b.user_id where ',
      selectAllBack: ' limit ?,?'
    }
  },
  //借款管理
  loanManagement: {
    loanApplicationsList: {
      getCount: 'select count(*) as count from ?? where status in (0 ,-3, 1 ,-4, 20 ,-5, 22 ,-10, 21, 23, 30,-11,-20, 34) and ',
      selectAllFront: 'select out_trade_no, realname, user_phone, case when customer_type = 0 then "新用户" when customer_type = 1 then "老用户" end as customer_type, money_amount, into_money, loan_term, apr, loan_interests, sjloan_urgent_fee,order_time, verify_loan_time,updated_at, case when status = 0 then "待初审" when status =-3 then "初审驳回" when status = 1 then "初审通过" when status =-4 then "复审驳回" when status = 20 then "复审通过,待放款" when status =-5 then "放款驳回" when status = 22 then "放款中" when status =-10 then "放款失败" when status = 21 then "已放款，还款中" when status = 23 then "部分还款" when status = 30 then "已还款" when status = -11 then "已逾期" when status = -20 then "已坏账" when status = 34 then "逾期已还款" end as status from ?? where status in (0 ,-3, 1 ,-4, 20 ,-5, 22 ,-10, 21, 23, 30,-11,-20, 34) and ',
      selectAllBack: ' limit ?,?'
    },
    loanAuditList: {
      getCount: 'select count(*) as count from ?? where (loan_time between ? and ?) and status in ( 20, -5, 22, -10, 21 ) and ',
      selectAllFront: 'select id, out_trade_no, yurref, realname, user_phone, case when customer_type = 0 then "新用户" when customer_type = 1 then "老用户" end as customer_type, money_amount, loan_term, apr, loan_interests, into_money, order_time, loan_time, loan_end_time, updated_at, case when status=20 then "复审通过,待放款" when status=-5 then "放款驳回" when status=22 then "放款中" when status=-10 then "放款失败" when status=21 then "已放款，还款中" end as state, status, pay_remark from ?? where (loan_time between ? and ?) and status in ( 20, -5, 22, -10, 21 ) and ',
      selectAllBack: ' limit ?,?'
    },
    raiseQuotaRecord: {
      getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select user_id, realname, user_phone, new_amount_max/100 as new_amount_max, add_amount/100 as add_amount, repayment_succ_count, repayment_norm_count, IFNULL(repayment_succ_amount/100,0) as repayment_succ_amount, IFNULL(repayment_norm_amount/100,0) as repayment_norm_amount, last_apply_at, create_at, updated_at, case when status=0 then "待审核"when status=1 then "审核通过" else "审核失败" end as status, audit_user, remark from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    reconciliationFunction: {
      getCount: 'select count(*) as count from ?? t1 inner join ?? t on t.id=t1.id where (t.loan_time between ? and ?) and ',
      selectAllFront: 'select t.out_trade_no, t.yurref, t.realname, t.user_phone, case when t.customer_type = 1 then "老用户" when t.customer_type = 0 then "新用户" end as customer_type, t.money_amount/100 as money_amount, t.into_money/100 as into_money,   t.loan_term as loan_term, t.loan_interests/100 as loan_interests, t.sjloan_urgent_fee/100 as sjloan_urgent_fee,   t.apr, case when t.is_fenqi = 1 then "否" else "是" end as is_fenqi, t.order_time, t.loan_time, t.pay_remark from ?? t1 inner join ?? t on t.id=t1.id where (t.loan_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    assetInformation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.asset_order_id=t1.id where (t.loan_time between ? and ?) and ',
      selectAllFront: 'select t.asset_order_id, t.realname, t.user_phone, case when t.customer_type = 1 then "老用户" when t.customer_type = 0 then "新用户" end as customer_type, t.money_amount/100 as money_amount, t.loan_term, t.apr, t.loan_interests/100 as loan_interests, t.order_time, t.loan_time, t.updated_at, case when t1.credit_lv=0 then "未知" when t1.credit_lv=1 then "A" when t1.credit_lv=2 then "B" when t1.credit_lv=3 then "C" else "" end as credit_lv, case when t.status = 0 then "待推送" when t.status = 1 then "推送中" when t.status = 2 then "推送成功" when t.status = 3 then "推送失败" end as status, t1.pay_remark from ?? t inner join ?? t1 on t.asset_order_id=t1.id where (t.loan_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    }
  },
  /*还款管理*/
  //还款列表  待还列表
  repaymentManagement: {
    waitingForReturnList: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id where t.status in (21,23,-11,-20) and ',
      selectAllFront: 'select t1.realname, t1.user_phone, case when t1.customer_type =0 then "新用户" else "老用户" end as customer_type, t.repayment_principal/100 as repayment_principal, t.repayment_interest/100 as repayment_interest, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t.credit_repayment_time, t.repayment_time, t.late_day, case when t.status=21 then "已放款/待还款" when t.status=23 then "部分还款" when t.status=-11 then "已逾期" when t.status=-20 then "已坏账" end as status, case when t.is_fenqi = 2 then "是" else "否" end as is_fenqi from ?? t inner join ?? t1 on t.user_id=t1.id where t.status in (21,23,-11,-20) and ',
      selectAllBack: ' limit ?,?'
    },
    //还款列表  已还列表
    returnedList: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id where (t.status in (30,34)) and (t.repayment_real_time between ? and ?) and ',
      selectAllFront: 'select t.id, t1.realname, t1.user_phone, case when t1.customer_type = 0 then "新用户" when t1.customer_type = 1 then "老用户" end as customer_type, t.repayment_principal/100 as repayment_principal, t.repayment_principal/100 as repayment_principal, t.repayment_interest/100 as repayment_interest, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t.credit_repayment_time, t.repayment_real_time, t.repayment_time, case when t.status=30 then "正常已还款" else "逾期已还款" end as status, case when t.is_fenqi=2 then "是" else "否" end as is_fenqi from ?? t inner join ?? t1 on t.user_id=t1.id where (t.status in (30,34)) and (t.repayment_real_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    //对账列表  还款对账
    repaymentReconciliation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.user_id =t2.user_id where (t.status in (30,34,21,23,-11,-20)) and (t.repayment_time between ? and ?) and ',
      selectAllFront: 'select t.user_id, t2.order_id, t.id, t1.realname, t1.user_phone, t.money_amount/100 as money_amount,   t.repayment_principal/100 as repayment_principal, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t2.true_repayment_money/100 as true_repayment_money, ifnull(t2.return_money/100,0) as return_money, case when t2.repayment_type=1 then "支付宝" when t2.repayment_type=2 then "富友" when t2.repayment_type=3 then "连连" when t2.repayment_type=4 then "连连代扣服务费" when t2.repayment_type=5 then "对公银行卡转账" when t2.repayment_type=6 then "减免" when t2.repayment_type=7 then "线下还款" when t2.repayment_type=8 then "益码通支付宝" when t2.repayment_type=9 then "借款优惠服务费" end as repayment_type, case when t.status=30 then "已还款" when t.status=21 then "已放款，还款中" when t.status=23 then "部分还款" when t.status=-11 then "已逾期" when t.status=-20 then "已坏账" when t.status=34 then "逾期已还款" end as conditions, case when t2.status=0 then "等待"when t2.status=1 then "失败" when t2.status=2 then "成功" end as status, t.repayment_time from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.user_id =t2.user_id where (t.status in (30,34,21,23,-11,-20)) and (t.repayment_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    //对账列表  续期对账
    renewalReconciliation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.asset_repayment_id=t2.id where t.status=1 and t.ts_status in (0,1) and (t.order_time between ? and ?) and ',
      selectAllFront: 'select t.user_id, t1.realname, t1.user_phone, t.asset_repayment_id, t.order_id, t2.repayment_amount/100 as repayment_amount, t2.repaymented_amount/100 as repaymented_amount, t2.repayment_interest/100 as repayment_interest,   t.renewal_day, (t.loan_urgent_fee+t.plan_late_fee+t.loan_accrual+t.repayment_interest+t.renewal_fee)/100 as reback_count,   t.return_money/100 as return_money, t.old_repayment_time, t.repayment_time, case when t.renewal_type =1 then "富友" when t.renewal_type =2 then "支付宝" when t.renewal_type =3 then "连连" when t.renewal_type =4 then "益码通支付宝" end as renewal_type, t.order_time from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.asset_repayment_id=t2.id where t.status=1 and t.ts_status in (0,1) and (t.order_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  还款详情
    repaymentDetails: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.user_id inner join ?? t2 on t2.id=t.user_id where (t.repayment_real_time between ? and ?)',
      selectAllFront: 'select t1.id, t1.order_id, t2.realname, t2.user_phone, case when t2.customer_type=0 then "新用户" else "老用户" end as customer_type, t.repayment_principal/100 as repayment_principal, t.repayment_interest/100 as repayment_interest, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t1.true_repayment_money/100 as true_repayment_money, t.credit_repayment_time, t.repayment_time, case when t1.repayment_type= 1 then "支付宝" when t1.repayment_type= 2 then "银行卡主动还款" when t1.repayment_type= 3 then "银行卡自动扣款" when t1.repayment_type= 4 then "对公银行卡转账" else "" end as repayment_type, t.repayment_real_time, t1.order_time from ?? t inner join ?? t1 on t.user_id=t1.user_id inner join ?? t2 on t2.id=t.user_id where (t.repayment_real_time between ? and ?)',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  续期详情
    renewalParticulars: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.asset_repayment_id = t1.id inner join ?? t2 on t.user_id=t2.id where (t.status=1) and (t.order_time between ? and ?)',
      selectAllFront: 'select t.id, t2.realname, t2.user_phone, case when t2.customer_type = 0 then "新用户" else "老用户" end as customer_type, t1.repayment_principal/100 as repayment_principal, t1.repayment_interest/100 as repayment_interest, t.old_repayment_time, t.repayment_time, t1.renewal_count, t.renewal_day, (t.repayment_interest+t.renewal_fee+t.loan_urgent_fee+t.loan_accrual)/100 as renewal_amount,  case when t.renewal_type=1 then "富友" else "支付宝" end as renewal_type, t.order_time, case when t1.status = 0 then "待初审" when t1.status =-3 then "初审驳回" when t1.status = 1 then "初审通过" when t1.status =-4 then "复审驳回"when t1.status = 20 then "复审通过,待放款" when t1.status =-5 then "放款驳回" when t1.status = 22 then "放款中" when t1.status =-10 then "放款失败" when t1.status = 21 then "已放款，还款中" when t1.status = 23 then "部分还款" when t1.status = 30 then "已还款" when t1.status = -11 then "已逾期" when t1.status = -20 then "已坏账" when t1.status = 34 then "逾期已还款" end as status from ?? t inner join ?? t1 on t.asset_repayment_id = t1.id inner join ?? t2 on t.user_id=t2.id where (t.status=1) and (t.order_time between ? and ?)',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  已退列表
    rebackedList: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id = t1.id where (t.return_time between ? and ?) and ',
      selectAllFront: 'select t.id, t.return_order_id, t1.realname, t1.user_phone, t.user_id, case when customer_type = 0 then "新用户" else "老用户" end as customer_type, t.repayment_return_money/100 as repayment_return_money, case when t.return_type = 1 then "支付宝" when t.return_type = 2 then "富友" when t.return_type = 3 then "连连" else "" end as return_type, case when t.return_source = 1 then "还款" when t.return_source = 2 then "续期" end as return_source, t.return_time from ?? t inner join ?? t1 on t.user_id = t1.id where (t.return_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    //续期管理  续期列表
    renewalsList: {
      getCount: 'select count(*) as count from ?? t1 inner join ?? t on t.id = t1.user_id where (t1.repayment_time between ? and ?) and ',
      selectAllFront: 'select t1.order_id, t.realname, t.user_phone, case when t1.renewal_type =1 then "富友" when t1.renewal_type =2 then "支付宝" when t1.renewal_type =3 then "连连" when t1.renewal_type =4 then "益码通支付宝" end as renewal_type, t1.sum_fee/100 as sum_fee, t1.repayment_interest/100 as repayment_interest, t1.renewal_fee/100 as renewal_fee, t1.renewal_day, case when t1.status=0 then "付款中" when t1.status=1 then "付款成功" when t1.status=2 then "付款失败" else "" end as status, t1.repayment_time from ?? t1 inner join ?? t on t.id = t1.user_id where (t1.repayment_time between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    }
  },
//数据分析
  dataAnalysis: {
    selectAll: 'select * from ?? where d_date between ? and ? order by d_date desc limit ?,?',
    getCount: 'select count(*) as count from ?? where d_date between ? and ?'
  },
  //推广管理 推广渠道
  promotionManagement: {
    promotionChannel: {
      getCount: 'select count(*) as count from ?? t left join ?? t1 on t.rate_id=t1.id where (t.channel_name is not null and t.channel_name !="") and length(t.channel_name)>0 and (t.created_at between ? and ?) and ',
      selectAllFront: 'select t.channel_name, t.channel_code, t.operator_name, t.channel_tel, t.channel_province, t.channel_city, t.channel_area, t1.canal_rate_name, t.created_at from ?? t left join ?? t1 on t.rate_id=t1.id where (t.channel_name is not null and t.channel_name !="") and length(t.channel_name)>0 and (t.created_at between ? and ?) and ',
      selectAllBack: ' limit ?,?'
    },
    //推广管理 推广员管理
    promoterManagement: {
      getCount: 'select count(*) as count from ?? t left join ?? t1 on t.user_id = t1.id left join ?? t2 on t.channel_id = t2.id where (t1.realname is not null and t1.realname !="") and (t.created_at between ? and ?) and ',
      selectAllFront: 'select t1.realname, t1.user_phone, t2.channel_name, t2.operator_name, t2.channel_tel, t.created_at, t.rel_path, t.remark from ?? t left join ?? t1 on t.user_id = t1.id left join ?? t2 on t.channel_id = t2.id where (t1.realname is not null and t1.realname !="") and (t.created_at between ? and ?) and ',
      selectAllBack: ' limit ?,?',
      getSelectOptions: 'select channel_name from ?? group by channel_name '
    },
    //推广管理 推广统计（渠道）
    promotionChannelStatistics: {
      selectAllFront: 'select * from ?? where (channel_trader_name is not null and channel_trader_name !="") and (d_date between ? and ?) and ',
      selectAllBack: ' order by d_date desc limit ?,?',
      getCount: 'select count(*) as count from ?? where (channel_trader_name is not null and channel_trader_name !="") and (d_date between ? and ?) and '
    },
    //推广管理 推广统计（地区）
    promotionRegionStatistics: {
      selectAllFront: 'select * from ?? where (d_date between ? and ?) and ',
      selectAllBack: ' order by d_date desc limit ?,?',
      getCount: 'select count(*) as count from ?? where (d_date between ? and ?) and '
    },
    channelStatisticsSummary: {
      selectAllFront: 'select * from ?? where (channel_trader is not null and channel_trader !="") and ',
      selectAllBack: ' limit ?,?',
      getCount: 'select count(*) as count from ?? where (channel_trader is not null and channel_trader !="") and ',
      getSelectOptions: 'select channel_trader from ?? group by channel_trader'
    }
  }
}
module.exports = sqlMap
