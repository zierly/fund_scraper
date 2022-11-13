/*
 * @Author: 自迩
 * @Date: 2022-11-02 18:16:23
 * @LastEditTime: 2022-11-10 10:06:19
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_scraper\public\javascripts\spider.js
 */
const puppeteer = require('puppeteer');
const conn = require('../javascripts/conn')
const {
  url_type1_1,
  url_type1_2,
  url_type3_1,
  url_type3_2,
  url_type5_1,
  url_type5_2,
  url_type9_1,
  url_type9_2,
} = require('../data/url_list')

require('events').EventEmitter.defaultMaxListeners = 0


const updateSql = 'UPDATE tiantian SET ? WHERE fund_code=?'
const insertSql = 'INSERT INTO tiantian SET ?'
const deleteSql = 'delete from tiantian where fund_code=009087'
const replaceSql = 'replace into tiantian SET ?'

//国外基金不进行净值估算，故需要置valuationFlag为false
function scraper(urlList, type, valuationFlag = true){

  //将当前组的爬取promise放进数组，用promise.all来判断是否该组数据全部爬取成功
  let promiseArr = []

  for(let key in urlList){
    let curPromise = getInfo(urlList[key], valuationFlag)

    promiseArr.push(curPromise)

    curPromise.then(res => {
      // console.log(`success-- ${key}`)
      conn.query(replaceSql, {...res, fund_code: key, fund_type: type}, (err, res) => {
        if(err) return console.log('err--',key,err.message);
        // console.log(res);
      })
    }).catch(err => {
      console.log(`fail-- ${key} `, err)
    })
  }
  return Promise.all(promiseArr)
}

function delay(ms){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

//由于一次爬取过多会导致有些估值数据请求不回来，故采取分批爬取策略
async function spider(){
  console.log('spider running');
  try{
    await scraper(url_type1_1, '1')
    console.log('url_type1_1 success');

    await scraper(url_type1_2, '1')
    console.log('url_type1_2 success');

    await scraper(url_type3_1, '3')
    console.log('url_type3_1 success');

    await scraper(url_type3_2, '3')
    console.log('url_type3_2 success');

    await scraper(url_type5_1, '5', false)
    console.log('url_type5_1 success');

    await scraper(url_type5_2, '5', false)
    console.log('url_type5_2 success');

    await scraper(url_type9_1, '9')
    console.log('url_type9_1 success');

    await scraper(url_type9_2, '9')
    console.log('url_type9_2 success');

  } catch(err){
    console.log('scraper fail--',err)
  }

}

//爬取指定基金数据
let temp ='';

async function getInfo(url, valuationFlag = true){
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  try{
    let clickRes = await page.click('.ip_tips_btn')
    // console.log('clickRes',clickRes)
  }
  catch (err){
    console.log('click err', url ,err)
  }
  const valNode = await page.$('#gz_gsz')
  let valuation = await(await valNode.getProperty('innerText')).jsonValue();

  //等待估值数据加载
  if(valuationFlag){
    while(valuation === '--'){
      valuation = await(await valNode.getProperty('innerText')).jsonValue();
      // console.log('valuation', valuation);
    }
  }

  const netNode = await page.$('.dataItem02 .ui-font-large')
  const net_worth = await(await netNode.getProperty('innerText')).jsonValue();

  const nameNode = await page.$('.fundDetail-tit')
  let fund_name = await(await nameNode.getProperty('innerText')).jsonValue();
  fund_name = fund_name.slice(0,-9)
  const content = await page.content()

  let indM1 = content.indexOf('近1月：')
  let indM3 = content.indexOf('近3月：')
  let indM6 = content.indexOf('近6月：')
  let indY3 = content.indexOf('近1年：')

  temp = content.slice(indM1, content.indexOf('%', indM1) + 1)
  let M1 = temp.slice(temp.lastIndexOf('>') + 1)

  temp = content.slice(indM3, content.indexOf('%', indM3) + 1)
  let M3 = temp.slice(temp.lastIndexOf('>') + 1)

  temp = content.slice(indM6, content.indexOf('%', indM6) + 1)
  let M6 = temp.slice(temp.lastIndexOf('>') + 1)

  temp = content.slice(indY3, content.indexOf('%', indY3) + 1)
  let Y1 = temp.slice(temp.lastIndexOf('>') + 1)

  // console.log(M1, M3, Y1)
  await browser.close();
  return {
    fund_name,
    net_worth,
    valuation,
    M1,
    M3,
    M6,
    Y1,
    nav_date: getCurrentDate(),
  }
};

function getCurrentDate() {
  var date = new Date();
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
  return Y + M + D;
}

module.exports = spider