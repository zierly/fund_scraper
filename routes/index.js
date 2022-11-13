/*
 * @Author: 自迩
 * @Date: 2022-11-08 21:46:56
 * @LastEditTime: 2022-11-10 10:35:48
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_scraper\routes\index.js
 */
const express = require('express');
const schedule = require("node-schedule"); // 定时器
const conn = require('../public/javascripts/conn.js')
const spider = require('../public/javascripts/spider')
const router = express.Router();

// spider()
// 设置每天0点爬取数据存入数据库
// schedule.scheduleJob({
//   hour: 00,
//   minute: 00
// },()=>{
//   spider()
// })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/fundInfo', function(req, res, next) {
  console.log('get fundInfo');
  // res.render()
  conn.query('select * from tiantian', (err, result) => {
    if(err){
      res.send({
        status:1,
        msg: 'GET fail',
        err: err
      });
      return
    }
    // console.log(result)
    res.send({
      status:0,
      msg: 'GET success',
      data: result
    });
  })
});

module.exports = router;
