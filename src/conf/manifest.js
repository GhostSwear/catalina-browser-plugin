const npmPackage = require("./../../package.json");

/**
 * 最终会输出 manifest.json
 */
const config = {
    "manifest_version": 2,
    "name": "卡特琳娜",
    "version": npmPackage.version,
    "description": npmPackage.description,
    "icons": {
        "16": "./images/icon.png",
        "48": "./images/icon.png",
        "128": "./images/icon.png"
    },
    "browser_action": {
        "name": "卡特琳娜"
    },
    "background": {
        "page": "./pages/background.html"
    },
    "homepage_url": "https://github.com/YQHP-Happi/catalina-browser-plugin#readme",
    "permissions": [
        "webRequest",
        "webRequestBlocking",
        "<all_urls>"
    ],
    "content_scripts": [
        {
            "matches": [
                "http://*/testing/exam/createSkillPaper",
                "http://*/testing/exam/paper",
                "https://*/testing/exam/createSkillPaper",
                "https://*/testing/exam/paper",
                "http://*/testing/unified/exam",
                "https://*/testing/unified/exam"
            ],
            "js": [
                "js/index.js"
            ]
        }
    ]
};

module.exports = config;