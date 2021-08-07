// import tsImportPluginFactory from "@nice-labs/ts-import-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import TerserPlugin from "terser-webpack-plugin";
import * as webpack from "webpack";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

const config: webpack.Configuration = {
  entry: {
    app: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    filename: "[name].bundle.[chunkhash:8].js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          // getCustomTransformers: () => ({
          //   before: [
          //     tsImportPluginFactory(
          //       // predefined-names or ILibrary objects
          //       {
          //         // ILibrary object
          //         libraryName: "antd",
          //         libraryPath: "es",
          //         moduleName: "kebabCase",
          //         appendPaths: (paths) => `${paths.replace(/(.*)(row|col)/, "$1grid")}/style/index.less`,
          //       },
          //     ),
          //   ],
          // }),
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
              modules: {
                localIdentName: "[contenthash:8]",
                exportLocalsConvention: "camelCaseOnly",
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
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
              lessOptions: {
                javascriptEnabled: true,
              },
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
    // alias: {
    //   "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/antd/icon.ts"),
    // },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      maxSize: 100_000,
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js[x]?$/,
        // ignored in webpack5
        // cache: false,
        parallel: true,
        // Works only with
        // source-map, inline-source-map, hidden-source-map and nosources-source-map values
        // for the devtool option
        // sourceMap: false,
        terserOptions: {
          output: {
            beautify: false, // 不需要格式化
            comments: false, // 不保留注释
          },
          compress: {
            booleans: false,
            // drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: "./public/*.ico", to: "[name].[ext]"},
      ],
    }),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      // scriptLoading: 'blocking',
      template: "public/index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};

export default config;
