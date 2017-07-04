CREATE TABLE CUSTOMERS(
   registe_time VARCHAR (20),
   username VARCHAR (20),
   city  VARCHAR (20),
   borrow_date  VARCHAR (20) ,
   amount   VARCHAR (20),
   interest VARCHAR (20),
   per_day VARCHAR (20),
   payback_date VARCHAR (20),
   count VARCHAR (20)
);
CREATE TABLE funds(
   fundnumber   VARCHAR (50),
   yesterday_rose VARCHAR (20),
   week_rose  VARCHAR (20),
   month_rose  VARCHAR (20) ,
   trimonth_rose   VARCHAR (20),
   halfyear_rose VARCHAR (20),
   allyear_rose VARCHAR (20),
   lastyear_rose VARCHAR (20),
   triyear_rose VARCHAR (20)
);
INSERT INTO CUSTOMERS VALUES ('2015-05-02','李四','北京','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','李四','北京','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','王五','广州','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','小六','深圳','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','老七','洛阳','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','老八','广州','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','老九','深圳','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');
INSERT INTO CUSTOMERS VALUES ('2015-05-02','老十','洛阳','2016-05-02','30000.00','400.00','4.00','2017-05-02','35000.00');

INSERT INTO FUNDS VALUES ('002','0.13%','0.23%','0.43%','-0.23%','-0.13%','-0.58','1.16%','-1.97%');
INSERT INTO FUNDS VALUES ('003','0.13%','0.23%','0.43%','-0.23%','-0.13%','-0.58','1.16%','-1.97%');
INSERT INTO FUNDS VALUES ('004','0.13%','0.23%','0.43%','-0.23%','-0.13%','-0.58','1.16%','-1.97%');
INSERT INTO FUNDS VALUES ('005','0.13%','0.23%','0.43%','-0.23%','-0.13%','-0.58','1.16%','-1.97%');

CREATE TABLE user(
  name  VARCHAR (50),
  password  VARCHAR (50)
);
INSERT INTO user VALUES ('admin','admin');
INSERT INTO user VALUES ('super','123456');
