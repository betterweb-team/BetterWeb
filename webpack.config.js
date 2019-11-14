var webpack = require("webpack"),
    path = require("path"),
    glob = require("glob"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


var options = {
    target: "web", // Chrome client browser environment
    mode: "development",
    devtool: 'cheap-module-source-map',
    optimization: {
        // We no not want to minimize our code.
		minimize: false
	},
    entry: {
        article: path.join(__dirname, "src", "js", "article.js"),
        background: path.join(__dirname, "src", "js", "background.js"),
        option_page: path.join(__dirname, "src", "js", "option_page.js"),
        inject: path.join(__dirname, "src", "js", "inject.js"),
        page_action: path.join(__dirname, "src", "js", "page_action.js"),
        tfServices: path.join(__dirname, "src", "js", "tfServices.js"),
    },
    output: {
        path: path.join(__dirname, "dist_unpacked/js"),
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    externals: {
        chrome: 'chrome',
        settings: 'SETTINGS',
        SETTINGS: 'settings',
    }

};

module.exports = options;