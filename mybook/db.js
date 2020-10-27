/*
封装操作数据库的通用api
 */
const mysql = require('mysql');
//数据库链接
exports.base = (sql,data,callback)=>{

 const connection = mysql.createConnection({
  host     : '39.107.42.88',//数据库所在的服务器域名或ip地址
  user     : 'root',//登录数据库的账号
  password : 'huang24688',//登录数据的密码
  database : 'mytest'//表的名称
});
//执行数据库链接操作
connection.connect();

//操作数据库
connection.query(sql,data, function (error, results, fields) {
  if (error) throw error;
  callback(results);
 
});
//关闭数据库
connection.end();
}
