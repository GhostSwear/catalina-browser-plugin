const path = require("path");

// html 插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 复制文件夹
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 清理文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 编译参数
const argv = require("yargs").argv;
const DEV_MODE = "development";

module.exports = {
    mode: argv.mode || "development",
    devtool: argv.mode === DEV_MODE ? "cheap-module-eval-source-map" : "none",
    entry: {
        index: path.resolve(__dirname, "./src/index.js"),
        background: path.resolve(__dirname, "./src/js/background.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./js/[name].js"
    },
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, "dist"),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: "localhost",
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        // options 页面
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/pages/background.html"),
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            filename: path.resolve(__dirname, "./dist/pages/background.html"),
            chunks: ["background"]
        }),
        // 清理dist文件夹
        new CleanWebpackPlugin(),
        // 复制文件夹
        new CopyWebpackPlugin([{
            // 复制图片
            from: path.resolve(__dirname, "./src/images"),
            to: path.resolve(__dirname, "./dist/images"),
        }, {
            // 复制插件配置文件
            from: path.resolve(__dirname, "./src/conf/manifest.json"),
            to: path.resolve(__dirname, "./dist/manifest.json"),
        }])
    ]
};
