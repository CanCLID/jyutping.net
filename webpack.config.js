const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        include: path.resolve(__dirname, "./src"),
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "./src"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        include: path.resolve(__dirname, "./src"),
        use: "underscore-template-loader",
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, "./src"),
        use: "html-loader",
      },
      {
        test: /\.(jpg|png)$/i,
        include: path.resolve(__dirname, "./src"),
        use: "url-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    watchContentBase: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
