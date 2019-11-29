const { getConfig } = require("./js/init");
//require("./js/process");
console.log(getConfig);


/**
 * 程序入口
 */
async function run() {
    const config = await getConfig();
    console.log(config);
    
}


// 启动程序
run();