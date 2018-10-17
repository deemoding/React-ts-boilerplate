const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 65533;

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './public',
    port
  },
  mode: "development",
  devtool: "eval",
  entry: [
    path.resolve(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ]
      }, {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader' // 经过测试，如果不指定这个，也会默认用它处理
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }]
      }, {
        test: /\.tsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({url: `http://localhost:${port}`}),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    }),
  ]
};
