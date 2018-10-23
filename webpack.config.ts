import HtmlWebpackPlugin from "html-webpack-plugin";
import OpenBrowserPlugin from "open-browser-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const port = 65534;

const config: webpack.Configuration = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: "./public",
    port,
  },
  mode: "development",
  devtool: "eval",
  entry: [
    path.resolve(__dirname, "src/index.tsx"),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      }, {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "babel-loader",
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
        ],
      }, {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      }, {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: "file-loader",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({url: `http://localhost:${port}`}),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: "public/index.html",
    }),
  ],
};

export default config;
