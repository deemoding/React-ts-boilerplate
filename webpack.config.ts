import tsImportPluginFactory from "@nice-labs/ts-import-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import opener from "opener";
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
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory(
                // predefined-names or ILibrary objects
                {
                  // ILibrary object
                  libraryName: "antd",
                  libraryPath: "es",
                  moduleName: "kebabCase",
                  appendPaths: (paths: string) => `${paths.replace(/(.*)(row|col)$/, "$1grid")}/style/index.less`,
                },
              ),
            ],
          }),
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
                localIdentName: "[local]-[contenthash:base64:8]",
              },
              importLoaders: 2,
              localsConvention: "camelCase",
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      }, {
        test: /\.less$/,
        include: /node_modules/,
        exclude: /src/,
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
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/antd/icon.ts"),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: "public/index.html",
    }),
    (() => {
      class Opener {
        private done: boolean;
        constructor() {
          this.done = false;
        }

        public apply(compiler: webpack.Compiler) {
          compiler.hooks.done.tap("Opener", (stats) => {
            if (!(this.done || stats.hasErrors())) {
              opener(`http://localhost:${port}`);
              this.done = true;
            }
          });
        }
      }
      return new Opener();
    })(),
  ],
};

export default config;
