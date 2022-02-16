const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const output = path.resolve(__dirname, "./dist");
const include = path.resolve(__dirname, "./src");

/** @type { import("webpack").Configuration } */
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: output,
    filename: "index.js",
    assetModuleFilename: "assets/[name][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        include,
        use: "html-loader",
      },
      {
        test: /\.ts$/i,
        include,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        include,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
  devServer: {
    host: "0.0.0.0",
    useLocalIp: true,
    openPage: "http://localhost:8080",
    contentBase: output,
    watchContentBase: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
