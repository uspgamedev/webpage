require('webpack');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

module.exports = [
  {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    entry: path.join(__dirname, 'src/scripts/main.ts'),
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'script.js'
    },
  },
  {
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: "style.css"
        }
      )
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          use:
          {
            loader: 'url-loader',
            options: {
              publicPath: path.resolve(__dirname, 'src/assets'),
              outputPath: path.resolve(__dirname, 'out'),
              encoding: 'base64',
              name: '[name].[ext]',
              esModule: false
            }
          }
        },
      ]
    },
    optimization: {
      removeEmptyChunks: true,
      minimizer: [
        new CssMinimizerPlugin({
          sourceMap: true,
        }),
      ],
    },
    entry: path.join(__dirname, 'src/styles/main.css'),
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'trash.js'
    },
  }
];
