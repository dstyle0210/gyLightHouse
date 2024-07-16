const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');

const token = '6168835435:AAEX-jYqum2mD4N2ath6_QihrqjPC5GJ-C4';
const chatId = 6252259316;

async function sendResult(){
    const todayOrigin = fs.readFileSync("./report/today.json");
    const todayData = JSON.parse(todayOrigin);
    const audits = todayData["audits"];
    

    const numericValue = (key) => Math.floor( audits[key].numericValue *0.8 );
    const FCP = numericValue("first-contentful-paint");
    const SI = numericValue("speed-index");
    const LCP = numericValue("largest-contentful-paint");
    const TBT = numericValue("total-blocking-time");
    console.log({FCP,SI,LCP,TBT});

    fs.mkdirSync("./report",{recursive:true});
    const networkOrigin = fs.readFileSync("./report/network.json");
    const networkData = JSON.parse(networkOrigin);
    const networkData2 = {min:networkData.min * 0.2,max:networkData.max * 0.2,arg:networkData.arg * 0.2};

    console.log(networkData2);

    /*
    const bot = new TelegramBot(token, {polling: false});
    const result = Object.assign({FCP,SI,LCP,TBT},networkData);
    const message = `FCP : ${FCP*0.9}`
    bot.sendMessage(chatId, `[TEST] ${JSON.stringify(result)}`);
    */
}
sendResult();
// import TelegramBot from 'node-telegram-bot-api';
