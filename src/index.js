import { getConfig } from "./js/init";
import process from "./js/process";

//require("./js/process");

/**
 * 程序入口
 */
async function run() {
    try {
    // 获取配置
        const config = await getConfig();
        // 判断是否可用
        if (!config.enable) {
            console.log("%c" + config.closeMsg, "color:red;font-size:40px;");
            return;
        }

        // 获取答案
        await process(config);

    } catch (error) {
        console.log("程序出现无法修复的错误，请刷新页面！", error);
    }
}

// 启动程序
run();
