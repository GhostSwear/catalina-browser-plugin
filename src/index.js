import { getConfig, CURR_VERSION_CODE, CURR_VERSION } from "./js/init";
import process from "./js/process";

/**
 * 程序入口
 */
async function run() {
    try {

        // 输出项目地址
        console.log("项目地址：https://github.com/YQHP-Happi/catalina-browser-plugin");
        console.log("使用教程：https://github.com/YQHP-Happi/catalina-browser-plugin/blob/master/README.md#%E5%89%8D%E8%A8%80");
        console.log("联系我们：https://github.com/YQHP-Happi/catalina-browser-plugin/blob/master/README.md#%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC\n\n");
        
        // 输出当前版本
        console.log(`当前卡特琳娜版本：${CURR_VERSION}，当前卡特琳娜版本码：${CURR_VERSION_CODE}\n\n`);
        
        // 获取配置
        const config = await getConfig();
        // 判断是否可用
        if (!config.enable) {
            console.log("%c" + config.closeMsg, "color:red;font-size:40px;");
            writeNote(config.closeMsg);
            return;
        }

        //判断是否最新版本
        if (config.maxVersionCode > CURR_VERSION_CODE) {
            console.log(`当前版本:${CURR_VERSION}，最新版本:${config.maxVersion}`);
            writeNote(`<a target="_blank" style="color:blue;text-decoration: underline;" href="https://github.com/YQHP-Happi/catalina-browser-plugin#%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8">卡特琳娜 当前版本:${CURR_VERSION},最新版本:${config.maxVersion}</a>`);
            return;
        }

        // 获取答案
        await process(config);

    } catch (error) {
        console.log("程序出现无法修复的错误，请刷新页面！", error);
    }
}

function writeNote(text) {
    const div = document.createElement("div");
    div.innerHTML = `<div style="position: fixed;top: 15px;right: 10px;height: auto;line-height: 40px;color: darkred;border-radius: 5px;padding: 0 8px;font-size:14px;background-color: #fff;z-index: 1000000;">${text}</div>`;
    document.body.appendChild(div);
}

// 启动程序
run();
