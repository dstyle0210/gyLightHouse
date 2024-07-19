const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TG_TOKEN_MABONGPAPA;
const chatId = process.env.TG_CHATID_MABONGPAPA;
console.log(token,chatId);
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
    const networkData2 = {min:Math.floor(networkData.min * 0.2),max:Math.floor(networkData.max * 0.2),arg:Math.floor(networkData.arg * 0.2)};

    console.log(networkData2);

    const bot = new TelegramBot(token, {polling: false});
    const res = Object.assign({FCP,SI,LCP,TBT},networkData2);
    const template = `
[LightHouse:GyShop]
FCP : ${res.FCP},
SI : ${res.SI},
LCP : ${res.LCP},
TBT : ${res.TBT},
MIN : ${res.min},
MAX : ${res.max},
ARG : ${res.arg}`;
    bot.sendMessage(chatId, template);
}
// sendResult();
// import TelegramBot from 'node-telegram-bot-api';
