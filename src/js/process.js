// 把图片转成md5
const port = chrome.runtime.connect({ name: "img2md5" });

// 因为跨域限制，所以通过background.js来请求
const getAnswersPort = chrome.runtime.connect({ name: "getAnswers" });

// 点击事件
const CLICK_EVENT = document.createEvent("MouseEvents");
CLICK_EVENT.initEvent("click", true, true);

async function inject(config) {
    console.log("开始获取图片...");
    let imgs = document.querySelectorAll("div.sec.post div.sec2.grays pre img");
    if (imgs.length === 0) {
        console.log("获取的图片dom是0个无法注入答案");
        return;
    }
    console.log(`获取图片成功...共：${imgs.length}张`);

    console.log("开始获取图片Url...");
    let imgUrls = [];
    imgs.forEach(e => {
        imgUrls.push(e.getAttribute("src"));
    });
    if (imgUrls.length === 0) {
        console.log("获取图片url是0个无法注入答案");
        return;
    }
    console.log(`获取图片Url成功...共：${imgs.length}个`);

    console.log("开始获取图片的md5...");
    const md5s = await img2md5(imgUrls);
    console.log("获取图片的md5成功...", md5s);

    console.log("开始通过md5获取答案...", md5s);
    const answers = await getAnswers(md5s);
    if (answers.length === 0) {
        console.log("通过md5获取答案失败");
        return;
    }
    console.log("通过md5获取答案成功...", answers);

    console.log("开始获取选项...");
    let choices = document.querySelectorAll("div.sec.post ul.sec2.grays");
    console.log(`获取选项成功...共：${choices.length}`);

    console.log("开始根据答案选中选项...");
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        if (answer.length === 0) {
            console.log(`%c因为第${i + 1}题没有获取到答案因此跳过`, "color:#EEB422");
            continue;
        } else {
            // 获取到具体的某个选项，然后一一对比
            let lis = choices[i].querySelectorAll("li pre a");
            answer.forEach(e => {
                lis.forEach(k => {
                    if (aLine(e) == aLine(k.innerText)) {
                        // 触发点击事件
                        k.dispatchEvent(CLICK_EVENT);
                    }
                });
            });
        }
    }
    console.log("根据答案选中选项完毕...");
}

/**
 * 把图片转成md5
 */
function img2md5(imgUrls) {
    return new Promise((resolve, reject) => {
        port.postMessage({ imgUrls, referer: location.href });
        port.onMessage.addListener(resolve);
    });
}

/**
 * 将文字转换成一行
 */
function aLine(text) {
    return text
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/\r/g, "")
        .replace(/\r\n/g, "")
        .replace(/"/g, "")
        .replace(/\s+/g, "");
}

/**
 * 根据md5获取答案
 */
function getAnswers(md5s) {
    return new Promise((resolve, reject) => {
        getAnswersPort.postMessage(md5s);
        getAnswersPort.onMessage.addListener(d => {
            if (d.success) {
                resolve(d.data);
            } else {
                console.error(d);
                resolve([]);
            }
        });
    });
}

export default inject;
