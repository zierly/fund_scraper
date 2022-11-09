/*
 * @Author: 自迩
 * @Date: 2022-11-08 21:46:56
 * @LastEditTime: 2022-11-09 22:28:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_scraper\routes\index.js
 */
var express = require('express');
const conn = require('../public/javascripts/conn.js')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/fundInfo', function(req, res, next) {
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
    console.log(result)
    res.send({
      status:0,
      msg: 'GET success',
      data: result
    });
  })
});

module.exports = router;
