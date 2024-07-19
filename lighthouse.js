const fs = require("fs");
const {chromium,devices} = require("playwright");

async function test() {
    const browser = await chromium.launch({ headless: true});
    const mobileContext = devices["Moto G4"];
    const context = await browser.newContext(mobileContext);
    const page = await context.newPage();
    page.route('**', route => route.continue()); // disabled cache

    await page.goto('https://m.gongyoungshop.kr/main.do?idx=3');

    let counts = [0,1,2,3,4,5,6,7,8,9]
    let networkTimes = [];
    for await (const count of counts){
        console.log(count);
        await getNetworkTime();
    };
    async function getNetworkTime(){
        await page.reload();
        await new Promise((res)=>setTimeout(res,1000));
        const _time = await page.evaluate(()=>{
            let time = performance.timing;
            let pageloadtime = time.loadEventStart - time.navigationStart;
            return pageloadtime;
        });
        console.log(_time);
        networkTimes.push(_time);
    };

    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    const min = Math.floor( Math.min.apply(null, networkTimes) );
    const max = Math.floor( Math.max.apply(null, networkTimes) );
    const arg = Math.floor( average(networkTimes) );
    console.log({min,max,arg});

    fs.mkdirSync("./report",{recursive:true});
    fs.writeFileSync("./report/network.json",JSON.stringify({min,max,arg}),"utf8");

    

    // const bot = new TelegramBot(token, {polling: false});
    // bot.sendMessage(chatId, `[TEST] ${min},${max},${arg}`);



    await browser.close();
}
test();