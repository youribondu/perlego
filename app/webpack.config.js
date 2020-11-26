const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const envMode = (env && env["ENV_MODE"]) || "prod";
  console.log("Building for", envMode);

  const config = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    devServer: {
      open: true,
      hot: true,
    },
    resolve: {
      alias: {
        env$: path.resolve(__dirname, "src/env/vars." + envMode + ".js"),
      },
      extensions: [".js", ".jsx", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new MiniCssExtractPlugin(),
    ],
  };

  return config;
};
