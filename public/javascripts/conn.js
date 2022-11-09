/*
 * @Author: 自迩
 * @Date: 2022-11-09 22:14:52
 * @LastEditTime: 2022-11-09 22:27:01
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_scraper\public\javascripts\conn.js
 */
const mysql = require('mysql');

// 创建数据库连接对象
const conn = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'penghua_db'
})

// 当数据库发生异常
conn.on('error', (err)=>{
  if (err.code = 'PROTOCOL_CONNECTION_LOST') {
    console.log('数据库连接中断')
    conn.connect()
  }else {
    console.error(err.stack || err);
  }
})

module.exports = conn
