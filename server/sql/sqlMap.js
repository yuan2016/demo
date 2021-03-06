// sql语句
let sqlMap = {
  // 登陆
  login: {
    select: 'select user_password,user_name,available_table from ?? where user_email = ?'
  },
  userData: {
    select: 'select available_table,department,role,user_name,user_sex,user_mobile from ?? where user_email = ?',
    update: 'UPDATE ?? SET user_name = ?,user_sex=?,user_mobile=?,department=? WHERE user_email = ?'
  },
  //修改密码
  passwordModify: {
    getPass: 'select user_password from ?? where user_email = ?',
    modifyPass: 'UPDATE ?? SET user_password = ? WHERE user_email = ? '
  },
  //首页
  main: {
    selectAll: 'select * from ??'
  },
  //用户信息管理
  userInformationManagement: {
    userList: {
      getCount: 'select count(*) as count from ??',
      selectAllFront: 'select id, realname, company_name, user_phone, id_number, DATE(SUBSTR(ID_NUMBER,7,8)) as birthday, user_sex, CASE WHEN STATUS = 2 THEN "是" WHEN STATUS = 1 then "否" END as status, create_time from ??',
      order: ' ORDER BY create_time desc',
      limit: ' limit ?,?'
    },
    userAddressBook: {
      getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select id, user_id, user_name, contact_name, contact_phone, create_time from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    bankcardsList: {
      getCount: 'select count(*) as count from ??',
      selectAllFront: 'select id, user_id, open_name, phone, bank_name, card_no, CASE WHEN MAIN_CARD = 0 THEN "是" ELSE "否" END as main_card, CASE WHEN TYPE = 1 THEN "信用卡" WHEN TYPE = 2 THEN "借记卡" ELSE "对公账号" END as type,CASE WHEN STATUS = 0 THEN "无效" WHEN STATUS = 1 THEN "生效" END as card_status,create_time FROM ??',
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
  //RMAB
  //借款通过率
  RMAB: {
    loanThroughRate: {
      selectAll: 'select AA,D1,D2,D3,D4,D5,D6,D7,DOD,W1,W2,W3,W4,WOW,M1,M2,M3,MOM from ??'
    },
    loanOverdueRecallRate: {
      selectAll: 'SELECT AA,D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,DOD,W1,W2,W3,W4,WOW,M1,M2,M3,MOM FROM ?? where loan_term = ?'
    },
    userBasePortrait: {
      selectAll: 'select user_age,user_sex,addr_birth,addr_now,user_cot,loan_cot_avg,loan_cot_savg,loan_amt_savg,time_avg,tgl_snew,tgl_sold,yql_avg_old,yql_avg_new,hk1_avg_old,hk1_avg_new,xq_avg,loan_day14_acot,loan_stages_acot,loan_stg21_acot,loan_stg90_acot from ?? WHERE loan_cot_savg>0 and user_cot>10',
      order: ' order by user_cot desc,loan_cot_avg desc,loan_amt_savg desc',
      limit: ' limit ?,?',
      getCount: 'select count(*) as count from ?? WHERE loan_cot_savg>0 and user_cot>10'
    },
    invitationEvent: {
      selectAll: 'select AA,D1,D2,D3,D4,D5,D6,D7,DOD,W1,W2,W3,W4,WOW,M1,M2,M3,MOM from pr_ds_invite_event_analysis'
    },
    operationUserPortrait: {
      select: 'select ifnull(user_age,"--") as age,ifnull(user_sex,"--") as sex,ifnull(addr_birth,"--") as birth,addr_now,zcl,zcl_zb,yxzcl,qysrz,hmd,jjs,loan,new_loan,old_loan,loan_suss,new_loan_suss,old_loan_suss,zdq,new_zdq,old_zdq,dq,new_dq,old_dq,yq,new_yq,old_yq,syyq,new_syyq,old_syyq,loan_day14,loan_stages21 from ??  where zcl>=100 ',
      limit: ' limit ?,?',
      order: ' order by user_age is not null desc,user_age,zcl desc',
      getCount: 'select count(*) as count from ?? where zcl>=100'
    },
    newUserPassRateRatio: {
      tab1: {
        hoursSelect: 'select  max(case when rn=0 then htgl end) as h1tgl,max(case when rn=1 then htgl end) as h2tgl,max(case when rn=2 then htgl end) as h3tgl,max(case when rn=3 then htgl end) as h4tgl,max(case when rn=4 then htgl end) as h5tgl,max(case when rn=5 then htgl end) as h6tgl,max(case when rn=6 then htgl end) as h7tgl,max(case when rn=7 then htgl end) as h8tgl,max(case when rn=8 then htgl end) as h9tgl,max(case when rn=9 then htgl end) as h10tgl,max(case when rn=10 then htgl end) as h11tgl,max(case when rn=11 then htgl end) as h12tgl,max(case when rn=12 then htgl end) as h13tgl,max(case when rn=13 then htgl end) as h14tgl,max(case when rn=14 then htgl end) as h15tgl,max(case when rn=15 then htgl end) as h16tgl,max(case when rn=16 then htgl end) as h17tgl,max(case when rn=17 then htgl end) as h18tgl,max(case when rn=18 then htgl end) as h19tgl,max(case when rn=19 then htgl end) as h20tgl,max(case when rn=20 then htgl end) as h21tgl,max(case when rn=21 then htgl end) as h22tgl,max(case when rn=22 then htgl end) as h23tgl,max(case when rn=23 then htgl end) as h24tgl from (select "排序" as flag ,@rownum:=@rownum+1 AS rn,htgl*100 as htgl from (select @rownum:=-1) r, (select zbdm as d_date ,0 as d_hour,h1tgl as htgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,1 as d_hour,h2tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,2 as d_hour,h3tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d"))union all select zbdm as d_date ,4 as d_hour,h5tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,5 as d_hour,h6tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,6 as d_hour,h7tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d"))union all select zbdm as d_date ,7 as d_hour,h8tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,8 as d_hour,h9tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,9 as d_hour,h10tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,10 as d_hour,h11tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d"))  union all select zbdm as d_date ,11 as d_hour,h12tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,12 as d_hour,h13tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,13 as d_hour,h14tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,14 as d_hour,h15tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,15 as d_hour,h16tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,16 as d_hour,h17tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,17 as d_hour,h18tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,18 as d_hour,h19tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,19 as d_hour,h20tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,20 as d_hour,h21tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,21 as d_hour,h22tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,22 as d_hour,h23tgl from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d")) union all select zbdm as d_date ,23 as d_hour,h24tgl from ??  where zbmc="日"  and (zbdm2>=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d"))) t where (t.d_date=date_format(date_add(now(), interval -25 hour),"%Y-%m-%d") and t.d_hour>=hour(date_add(now(), interval -25 hour))) or (t.d_date=date_format(now(),"%Y-%m-%d") and t.d_hour<hour(now())) order by t.d_date ,t.d_hour )t2 group by flag',
        dailySelect: 'select date_format(zbdm,"%c.%e") as d_date,tgl*100 as r_tgl from ?? where zbmc="日"and zbdm2>=date_add(date_format(now(),"%Y-%m-%d"), interval -29 day)',
        weeklySelect: 'select concat(concat(date_format(substr(zbdm,1,10),"%c.%e"),"-"),date_format(substr(zbdm,13,10),"%c.%e")) as d_week,tgl*100 as z_tgl from ?? where zbmc="周"and zbdm2>=weekofyear(now())-9 and year(now())=substr(zbdm,1,4)',
        monthlySelect: 'select zbdm2 as d_month,tgl*100 as y_tgl from ?? where zbmc="月" and year(now())=year(zbdm)',
        getRatio: 'select (select tgl*100 as dr_tgl from pr_new_passrate_analysis where zbmc="日" and zbdm=date_format("2017-09-25","%Y-%m-%d")) as dr_tgl,(select (select (tgl*100) as zr_tgl from pr_new_passrate_analysis where zbmc="日" and (zbdm=date_format("2017-09-25","%Y-%m-%d"))) - (select (tgl*100) as zr_tgl from pr_new_passrate_analysis where zbmc="日" and (zbdm=date_format("2017-09-18","%Y-%m-%d")))) as rtb_tgl,(select (select (tgl*100) as sz_tgl from pr_new_passrate_analysis where zbmc="周" and (zbdm2=weekofyear(now())-1)) - (select (tgl*100) as zr_tgl from pr_new_passrate_analysis where zbmc="周" and (zbdm2=weekofyear(now())-2))) as zhb_tgl,(select (select (tgl*100) as sz_tgl from pr_new_passrate_analysis where zbmc="月" and (zbdm2=month(now())-1)) - (select (tgl*100) as zr_tgl from pr_new_passrate_analysis where zbmc="月" and (zbdm2=month(now())-2))) as yhb_tgl,(select avg(tgl)*100 as day7_avg_tgl from ?? where zbmc="日"and zbdm2>=date_add(date_format(now(),"%Y-%m-%d"), interval -6 day)) as day7_avg_tgl,(select avg(tgl)*100 as day30_avg_tgl from pr_new_passrate_analysis where zbmc="日"and zbdm2>=date_add(date_format(now(),"%Y-%m-%d"), interval -29 day)) as day30_avg_tgl from dual',
        compare: 'select "当日通过率" as zbmc ,zbdm as d_date,h1tgl*100,h2tgl*100,h3tgl*100,h4tgl*100,h5tgl*100,h6tgl*100,h7tgl*100,h8tgl*100,h9tgl*100,h10tgl*100,h11tgl*100,h12tgl*100,h13tgl*100,h14tgl*100,h15tgl*100,h16tgl*100,h17tgl*100,h18tgl*100,h19tgl*100,h20tgl*100,h21tgl*100,h22tgl*100,h23tgl*100,h24tgl*100 from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2=date_format(now(),"%Y-%m-%d")) union all select "某日通过率" as zbmc ,zbdm as d_date,h1tgl*100,h2tgl*100,h3tgl*100,h4tgl*100,h5tgl*100,h6tgl*100,h7tgl*100,h8tgl*100,h9tgl*100,h10tgl*100,h11tgl*100,h12tgl*100,h13tgl*100,h14tgl*100,h15tgl*100,h16tgl*100,h17tgl*100,h18tgl*100,h19tgl*100,h20tgl*100,h21tgl*100,h22tgl*100,h23tgl*100,h24tgl*100 from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2=?) union all select "当日申请数" as zbmc ,zbdm as d_date,h1_sqrs,h2_sqrs,h3_sqrs,h4_sqrs ,h5_sqrs,h6_sqrs,h7_sqrs,h8_sqrs ,h9_sqrs,h10_sqrs,h11_sqrs,h12_sqrs ,h13_sqrs,h14_sqrs,h15_sqrs,h16_sqrs ,h17_sqrs,h18_sqrs,h19_sqrs,h20_sqrs,h21_sqrs,h22_sqrs,h23_sqrs,h24_sqrs from pr_new_passrate_analysis  where zbmc="日"  and (zbdm2=date_format(now(),"%Y-%m-%d")) union all select "某日申请数" as zbmc ,zbdm as d_date,h1_sqrs,h2_sqrs,h3_sqrs,h4_sqrs ,h5_sqrs,h6_sqrs,h7_sqrs,h8_sqrs ,h9_sqrs,h10_sqrs,h11_sqrs,h12_sqrs ,h13_sqrs,h14_sqrs,h15_sqrs,h16_sqrs ,h17_sqrs,h18_sqrs,h19_sqrs,h20_sqrs,h21_sqrs,h22_sqrs,h23_sqrs,h24_sqrs from pr_new_passrate_analysis where zbmc="日" and zbdm2 = ?'
      }
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
      getCount: 'select count(*) as count from ?? where status in ( 20, -5, 22, -10, 21 )',
      selectAllFront: 'select id, out_trade_no, yurref, realname, user_phone, case when customer_type = 0 then "新用户" when customer_type = 1 then "老用户" end as customer_type, money_amount, loan_term, apr, loan_interests, into_money, order_time, loan_time, loan_end_time, updated_at, case when status=20 then "复审通过,待放款" when status=-5 then "放款驳回" when status=22 then "放款中" when status=-10 then "放款失败" when status=21 then "已放款，还款中" end as states, pay_remark from ?? where status in ( 20, -5, 22, -10, 21 )',
      selectAllBack: ' limit ?,?'
    },
    raiseQuotaRecord: {
      getCount: 'select count(*) as count from ?? where ',
      selectAllFront: 'select user_id, realname, user_phone, new_amount_max/100 as new_amount_max, add_amount/100 as add_amount, repayment_succ_count, repayment_norm_count, IFNULL(repayment_succ_amount/100,0) as repayment_succ_amount, IFNULL(repayment_norm_amount/100,0) as repayment_norm_amount, last_apply_at, create_at, updated_at, case when status=0 then "待审核"when status=1 then "审核通过" else "审核失败" end as status, audit_user, remark from ?? where ',
      selectAllBack: ' limit ?,?'
    },
    reconciliationFunction: {
      getCount: 'select count(*) as count from ?? t1 inner join ?? t on t.id=t1.id',
      selectAllFront: 'select t.out_trade_no, t.yurref, t.realname, t.user_phone, case when t.customer_type = 1 then "老用户" when t.customer_type = 0 then "新用户" end as customer_type, t.money_amount/100 as money_amount, t.into_money/100 as into_money,   t.loan_term as loan_term, t.loan_interests/100 as loan_interests, t.sjloan_urgent_fee/100 as sjloan_urgent_fee,   t.apr, case when t.is_fenqi = 1 then "否" else "是" end as is_fenqi, t.order_time, t.loan_time, t.pay_remark from ?? t1 inner join ?? t on t.id=t1.id',
      selectAllBack: ' limit ?,?'
    },
    assetInformation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.asset_order_id=t1.id',
      selectAllFront: 'select t.asset_order_id, t.realname, t.user_phone, case when t.customer_type = 1 then "老用户" when t.customer_type = 0 then "新用户" end as customer_type, t.money_amount/100 as money_amount, t.loan_term, t.apr, t.loan_interests/100 as loan_interests, t.order_time, t.loan_time, t.updated_at, case when t1.credit_lv=0 then "未知" when t1.credit_lv=1 then "A" when t1.credit_lv=2 then "B" when t1.credit_lv=3 then "C" else "" end as credit_lv, case when t.status = 0 then "待推送" when t.status = 1 then "推送中" when t.status = 2 then "推送成功" when t.status = 3 then "推送失败" end as status, t1.pay_remark from ?? t inner join ?? t1 on t.asset_order_id=t1.id',
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
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id where (t.status in (30,34))',
      selectAllFront: 'select t.id, t1.realname, t1.user_phone, case when t1.customer_type = 0 then "新用户" when t1.customer_type = 1 then "老用户" end as customer_type, t.repayment_principal/100 as repayment_principal, t.repayment_principal/100 as repayment_principal, t.repayment_interest/100 as repayment_interest, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t.credit_repayment_time, t.repayment_real_time, t.repayment_time, case when t.status=30 then "正常已还款" else "逾期已还款" end as status, case when t.is_fenqi=2 then "是" else "否" end as is_fenqi from ?? t inner join ?? t1 on t.user_id=t1.id where (t.status in (30,34))',
      selectAllBack: ' limit ?,?'
    },
    //对账列表  还款对账
    repaymentReconciliation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.user_id =t2.user_id where (t.status in (30,34,21,23,-11,-20))',
      selectAllFront: 'select t.user_id, t2.order_id, t.id, t1.realname, t1.user_phone, t.money_amount/100 as money_amount,   t.repayment_principal/100 as repayment_principal, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t2.true_repayment_money/100 as true_repayment_money, ifnull(t2.return_money/100,0) as return_money, case when t2.repayment_type=1 then "支付宝" when t2.repayment_type=2 then "富友" when t2.repayment_type=3 then "连连" when t2.repayment_type=4 then "连连代扣服务费" when t2.repayment_type=5 then "对公银行卡转账" when t2.repayment_type=6 then "减免" when t2.repayment_type=7 then "线下还款" when t2.repayment_type=8 then "益码通支付宝" when t2.repayment_type=9 then "借款优惠服务费" end as repayment_type, case when t.status=30 then "已还款" when t.status=21 then "已放款，还款中" when t.status=23 then "部分还款" when t.status=-11 then "已逾期" when t.status=-20 then "已坏账" when t.status=34 then "逾期已还款" end as conditions, case when t2.status=0 then "等待"when t2.status=1 then "失败" when t2.status=2 then "成功" end as status, t.repayment_time from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.user_id =t2.user_id where (t.status in (30,34,21,23,-11,-20))',
      selectAllBack: ' limit ?,?'
    },
    //对账列表  续期对账
    renewalReconciliation: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.asset_repayment_id=t2.id where t.status=1 and t.ts_status in (0,1)',
      selectAllFront: 'select t.user_id, t1.realname, t1.user_phone, t.asset_repayment_id, t.order_id, t2.repayment_amount/100 as repayment_amount, t2.repaymented_amount/100 as repaymented_amount, t2.repayment_interest/100 as repayment_interest,   t.renewal_day, (t.loan_urgent_fee+t.plan_late_fee+t.loan_accrual+t.repayment_interest+t.renewal_fee)/100 as reback_count,   t.return_money/100 as return_money, t.old_repayment_time, t.repayment_time, case when t.renewal_type =1 then "富友" when t.renewal_type =2 then "支付宝" when t.renewal_type =3 then "连连" when t.renewal_type =4 then "益码通支付宝" end as renewal_type, t.order_time from ?? t inner join ?? t1 on t.user_id=t1.id inner join ?? t2 on t.asset_repayment_id=t2.id where t.status=1 and t.ts_status in (0,1)',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  还款详情
    repaymentDetails: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id=t1.user_id inner join ?? t2 on t2.id=t.user_id',
      selectAllFront: 'select t1.id, t1.order_id, t2.realname, t2.user_phone, case when t2.customer_type=0 then "新用户" else "老用户" end as customer_type, t.repayment_principal/100 as repayment_principal, t.repayment_interest/100 as repayment_interest, t.repayment_amount/100 as repayment_amount, t.repaymented_amount/100 as repaymented_amount, t1.true_repayment_money/100 as true_repayment_money, t.credit_repayment_time, t.repayment_time, case when t1.repayment_type=1 then "支付宝" when t1.repayment_type=2 then "富友" when t1.repayment_type=3 then "连连" when t1.repayment_type=4 then "连连代扣服务费" when t1.repayment_type=5 then "对公银行卡转账" when t1.repayment_type=6 then "减免" when t1.repayment_type=7 then "线下还款" when t1.repayment_type=8 then "益码通支付宝" when t1.repayment_type=9 then "借款优惠服务费" else "" end as repayment_type, t.repayment_real_time, t1.order_time from ?? t inner join ?? t1 on t.user_id=t1.user_id inner join ?? t2 on t2.id=t.user_id where (t1.status =2)',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  续期详情
    renewalParticulars: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.asset_repayment_id = t1.id inner join ?? t2 on t.user_id=t2.id where (t.status=1)',
      selectAllFront: 'select t.id, t2.realname, t2.user_phone, case when t2.customer_type = 0 then "新用户" else "老用户" end as customer_type, t1.repayment_principal/100 as repayment_principal, t1.repayment_interest/100 as repayment_interest, t.old_repayment_time, t.repayment_time, t1.renewal_count, t.renewal_day, (t.repayment_interest+t.renewal_fee+t.loan_urgent_fee+t.loan_accrual)/100 as renewal_amount,  case when t.renewal_type=1 then "富友" else "支付宝" end as renewal_type, t.order_time, case when t1.status = 0 then "待初审" when t1.status =-3 then "初审驳回" when t1.status = 1 then "初审通过" when t1.status =-4 then "复审驳回"when t1.status = 20 then "复审通过,待放款" when t1.status =-5 then "放款驳回" when t1.status = 22 then "放款中" when t1.status =-10 then "放款失败" when t1.status = 21 then "已放款，还款中" when t1.status = 23 then "部分还款" when t1.status = 30 then "已还款" when t1.status = -11 then "已逾期" when t1.status = -20 then "已坏账" when t1.status = 34 then "逾期已还款" end as status from ?? t inner join ?? t1 on t.asset_repayment_id = t1.id inner join ?? t2 on t.user_id=t2.id where (t.status=1)',
      selectAllBack: ' limit ?,?'
    },
    //退款列表  已退列表
    rebackedList: {
      getCount: 'select count(*) as count from ?? t inner join ?? t1 on t.user_id = t1.id',
      selectAllFront: 'select t.id, t.return_order_id, t1.realname, t1.user_phone, t.user_id, case when customer_type = 0 then "新用户" else "老用户" end as customer_type, t.repayment_return_money/100 as repayment_return_money, case when t.return_type = 1 then "支付宝" when t.return_type = 2 then "富友" when t.return_type = 3 then "连连" else "" end as return_type, case when t.return_source = 1 then "还款" when t.return_source = 2 then "续期" end as return_source, t.return_time from ?? t inner join ?? t1 on t.user_id = t1.id',
      selectAllBack: ' limit ?,?'
    },
    //续期管理  续期列表
    renewalsList: {
      getCount: 'select count(*) as count from ?? t1 inner join ?? t on t.id = t1.user_id',
      selectAllFront: 'select t1.order_id, t.realname, t.user_phone, case when t1.renewal_type =1 then "富友" when t1.renewal_type =2 then "支付宝" when t1.renewal_type =3 then "连连" when t1.renewal_type =4 then "益码通支付宝" end as renewal_type, t1.sum_fee/100 as sum_fee, t1.repayment_interest/100 as repayment_interest, t1.renewal_fee/100 as renewal_fee, t1.renewal_day, case when t1.status=0 then "付款中" when t1.status=1 then "付款成功" when t1.status=2 then "付款失败" else "" end as status, t1.repayment_time from ?? t1 inner join ?? t on t.id = t1.user_id',
      selectAllBack: ' limit ?,?'
    }
  },
//数据分析
  dataAnalysis: {
    selectAll: 'select * from ??',
    order: ' order by d_date desc',
    selectAllBack: ' limit ?,?',
    getCount: 'select count(*) as count from ??',
    dailyLendingDataExcel: 'select d_date as "日期",register_num as "注册人数",loan_num as "借款人数",success_loan_num as "成功借款人数",newuser_loan_rate as "新用户借款占比",olduser_loan_rate as "老用户借款占比",accunewuser_loan_rate as "累计新用户借款占比",accuolduser_loan_rate as "累计老用户借款占比",loan_singular as "放款单数",loan_singular_7day as "7天期限放款单数",loan_singular_14day as "14天期限放款单数",loan_singular_21day as "21天期限放款单数",loan_singular_f_21day as "21天分期放款单数",loan_singular_90day as "90天分期放款单数",loan_singular_t_21day as "21天分期提额放款单数",loans_total as "放款总额(元)",loans_total_7day as "7天期限放款总额(元)",loans_total_14day as "14天期限放款总额(元)",loans_total_21day as "21天期限放款总额(元)",loans_total_f_21day as "21天分期放款总额(元)",loans_total_90day as "90天分期放款金额(元)",loans_total_t_21day as "21天分期提额放款金额(元)",loan_singular_ouser as "老用户放款单数",loans_total_ouser as "老用户放款总额(元)",loan_singular_nuser as "新用户放款单数",loans_total_nuser as "新用户放款总额",CHARGEBACK_FAILRATE as "扣款失败率",create_time as "更新时间" from ??',
    overdueRepaymentStatisticsExcel: 'select d_date as "日期",loan_amount_total as "当前借款总数量",loan_money_total as "当前借款总额",repayment_amount_total as "已经还款总数量",repayment_money_total as "已经还款总额",quantity_overdue as "逾期中数量",total_overdue as "逾期中总额",m_overdue_rate_s1 as "S1级逾期率(按金额)",m_overdue_rate_s2 as "S2级逾期率(按金额)",m_overdue_rate_s3 as "S3级逾期率(按金额)",m_overdue_rate_m3 as "M3级逾期率(按金额)",n_overdue_rate_s1 as "S1级逾期率(按单数)",n_overdue_rate_s2 as "S2级逾期率(按单数)",n_overdue_rate_s3 as "S3级逾期率(按单数)",n_overdue_rate_m3 as "M3级逾期率(按单数)" from ??',
    fundAnalysisExcel: 'select d_date as "日期",total_amount as "当日应还总额",actual_repayment_amount as "实际还款金额",repayment_ratio as "还款比例",renewal_amount as "续期金额",renewal_commission as "续期手续费收入",renewal_ratio as "续期比例",overdue_amount as "逾期金额",overdue_proportion as "逾期比例",overdue_payment_amount as "逾期还款金额",late_fees_income as "滞纳金收入",comp_service_income as "综合服务费收入",service_charge as "实收服务费",equal_amount_income as "同等金额收益",capital_surplus as "当日资金盈余",create_time as "更新时间" from ??'
  },
//财务分析
  financeAnalysis: {
    repaymentMinutia: {
      selectAllFront: 'select * from ??',
      selectAllLimit: ' limit ?,?',
      orderBy: ' order by repayment_real_time desc',
      getCount: 'select count(*) as count from ??',
      selectAllExcel: 'select d_date as "日期", user_id as "用户ID", user_name as "借款人姓名", user_phone as "手机号", order_id as "债权ID", loan_id as "还款ID", loan_money as "借款金额", repayment_amount as "总应还款金额", repaymented_amount as "已还金额", repayment_Service as "服务费", loan_urgent_fee as "加急费", Principal_amount as "本金", loan_accrual as "利息", stages_fee as "分期费", renewal_service_fee as "续期服务费", renewal_fee as "续期手续费", Overdue_fine as "逾期滞纳金", repayment_real_money as "实还金额", return_money as "退款金额", loan_status as "借款状态", repayment_type as "还款方式", repayment_channel as "还款通道", repayment_detail as "还款详情", repayment_status as "还款状态", credit_repayment_time as "放款时间", repayment_time as "应还款时间", repayment_real_time as "实际还款时间", repayment_term as "还款期限", renewal_term as "续期期限", late_day as "逾期天数", service_rate as "基础服务费率", Urgent_rate as "加急费率", Loan_interest_rate as "借款利率", Installment_rate as "分期费率", Renewal_rate as "续期利率", Overdue_rate as "逾期费率",data_type as "数据类型"  from ??'
    },
    reconciliationAnalysis: {
      selectAllFront: 'SELECT * FROM ?? t LEFT JOIN ?? t1 ON t.d_date = t1.d_date',
      selectAllBack: ' limit ?,?',
      orderBy: ' order by t.d_date desc',
      getCount: 'select count(*) as count from ??',
      upadte: 'update ?? set AMT_FY_THIRD=?,AMT_FY_DIFF=?,AMT_LL_THIRD=?,AMT_LL_DIFF=?,AMT_ZFB_THIRD=?,AMT_ZFB_DIFF=?,AMT_YMT_THIRD=?,AMT_YMT_DIFF=?,AMT_LKL_THIRD=?,AMT_LKL_DIFF=?,REMARK=? where d_date=?'
    },
    //  还款日报表统计
    reportStatistics: {
      selectAllFront: 'select * from ??',
      selectAllBack: ' limit ?,?',
      orderBy: ' order by d_date desc',
      getCount: 'select count(*) as count from ??'
    }
  },
  //推广管理 推广渠道
  promotionManagement: {
    promotionChannel: {
      getCount: 'select count(*) as count from ?? t left join ?? t1 on t.rate_id=t1.id where (t.channel_name is not null and t.channel_name !="") and length(t.channel_name)>0',
      selectAllFront: 'select t.channel_name, t.channel_code, t.operator_name, t.channel_tel, t.channel_province, t.channel_city, t.channel_area, t1.canal_rate_name, t.created_at from ?? t left join ?? t1 on t.rate_id=t1.id where (t.channel_name is not null and t.channel_name !="") and length(t.channel_name)>0',
      selectAllBack: ' limit ?,?'
    },
    //推广管理 推广员管理
    promoterManagement: {
      getCount: 'select count(*) as count from ?? t left join ?? t1 on t.user_id = t1.id left join ?? t2 on t.channel_id = t2.id where (t1.realname is not null and t1.realname !="")',
      selectAllFront: 'select t1.realname, t1.user_phone, t2.channel_name, t2.operator_name, t2.channel_tel, t.created_at, t.rel_path, t.remark from ?? t left join ?? t1 on t.user_id = t1.id left join ?? t2 on t.channel_id = t2.id where (t1.realname is not null and t1.realname !="")',
      selectAllBack: ' limit ?,?',
      getSelectOptions: 'select channel_name from ?? group by channel_name '
    },
    //推广管理 推广统计（渠道）
    promotionChannelStatistics: {
      selectAllFront: 'select * from ?? where (channel_trader_name is not null and channel_trader_name !="")',
      selectAllBack: ' limit ?,?',
      order: ' order by d_date desc,day_consumption desc, register_num desc',
      getCount: 'select count(*) as count from ?? where (channel_trader_name is not null and channel_trader_name !="")',
      getSelectOptions: 'select channel_trader_name from ?? group by channel_trader_name',
      selectAllExcel: 'select d_date as "日期", channel_trader_name as "渠道商名称", settle_method as "结算方式", effe_cust_acqu_cost as "有效获客成本",day_consumption as "当日消耗",register_num as "注册量",all_fact_auth_num as "全要素认证人数",apply_loan_num as "申请借款人数",blacklist_num as "黑名单人数",entries_num as "进件数",nuser_apply_succ_num as "新用户申请成功人数", ouser_apply_succ_num as "老用户申请成功人数", nuser_loan_ratio as "新用户借款率",nuser_adoption_rate as "新用户通过率",nuser_loan_amount as "新用户放款金额",ouser_adoption_rate as "老用户通过率",ouser_loan_amount as "老用户放款金额",DUE_AMOUNT as "到期金额",overdue_num as "逾期人数", OVERDUE_AMOUNT as "逾期金额", BADDEBT_RATE as "坏账率", BADDEBT_amount as "坏账金额", UNITGROSS_PROFIT as "单位毛利润",baddebt_amount_unit as "单位坏账金额",create_time as "更新时间" from ?? where (channel_trader_name is not null and channel_trader_name !="")'
    },
    //推广管理 七日推广统计（渠道）
    promotionChannelStatistics7: {
      selectAllFront: 'select * from ?? where (channel_trader_name is not null and channel_trader_name !="") ',
      order: ' order by d_date desc,day_consumption desc, register_num desc',
      limit: ' limit ?,?',
      getCount: 'select count(*) as count from ?? where (channel_trader_name is not null and channel_trader_name !="") ',
      getSelectOptions: 'select channel_trader_name from ?? group by channel_trader_name',
      selectAllExcel: 'select d_date as "日期", channel_trader_name as "渠道商名称", effe_cust_acqu_cost as "七日获客成本",day_consumption as "七日消耗",register_num as "七日注册量",all_fact_auth_num as "七日全要素认证人数",apply_loan_num as "七日申请借款人数",blacklist_num as "七日黑名单人数",entries_num as "七日进件数",nuser_apply_succ_num as "七日新用户申请成功人数", ouser_apply_succ_num as "七日老用户申请成功人数", nuser_loan_ratio as "七日新用户借款率",nuser_adoption_rate as "七日新用户通过率",nuser_loan_amount as "七日新用户放款金额",ouser_adoption_rate as "七日老用户通过率",ouser_loan_amount as "七日老用户放款金额",DUE_AMOUNT as "七日到期金额",overdue_num as "七日逾期人数", OVERDUE_AMOUNT as "七日逾期金额", BADDEBT_RATE as "七日坏账率", BADDEBT_amount as "七日坏账金额", UNITGROSS_PROFIT as "七日单位毛利润",baddebt_amount_unit as "单位坏账金额",create_time as "更新时间" from ?? where (channel_trader_name is not null and channel_trader_name !="") '
    },
    //推广管理 推广统计（地区）
    promotionRegionStatistics: {
      selectAllFront: 'select * from ??',
      selectAllBack: ' limit ?,?',
      order: ' order by d_date desc',
      getCount: 'select count(*) as count from ??'
    },
    channelStatisticsSummary: {
      selectAllFront: 'select * from ?? where (channel_trader is not null and channel_trader !="") and ',
      selectAllBack: ' limit ?,?',
      getCount: 'select count(*) as count from ?? where (channel_trader is not null and channel_trader !="") and ',
      getSelectOptions: 'select channel_trader from ?? group by channel_trader'
    },
    PVUV: {
      selectDayFront: 'select d_date,element,element_id,title,pv,uv from ??',
      getCount: 'select count(*) as count from ??',
      // selectDayBack: 'd_date=date_sub(curdate(),interval 1 day)',
      order: ' order by d_date desc',
      limit: ' limit ?,?',
      getSelectOptions: 'select title from ?? group by title'
    }
  },
  /*权限管理*/
  // 员工信息
  privilegeManage: {
    employeeList: {
      selectAllFront: 'select * from ?? where ',
      selectAllBack: ' limit ?,?',
      getCount: 'select count(*) as count from ?? where ',
      privilegeModify: 'UPDATE ?? SET available_table = ? WHERE user_email = ?'
    }
  }
}
module.exports = sqlMap
