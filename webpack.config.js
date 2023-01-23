const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [stylesHandler, 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [stylesHandler, 'css-loader', 'sass-loader'],
          },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: ['/node_modules']
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}  
                  }
                ]
              },
              {
                test: /.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                type: 'asset/resource',
                generator: {
                     filename: "img/[name][ext]"
            }}
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../async/dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = () => {
    if (isProduction) {
      config.mode = 'production';
  
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      );
    } else {
      config.mode = 'development';
    }
    return config;
  };
