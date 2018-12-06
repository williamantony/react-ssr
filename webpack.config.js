const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
  mode: 'development',
  entry: './src/browser/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer(),
                ],
              }
            },
          ],
        })
      },
      {
        test: [
          /\.svg$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ''),
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/css/[name].css',
    }),
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = true;',
      raw: true,
      include: /\.js$/
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    hot: true,
  },
};

const serverConfig = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
          },
        ],
      },
      {
        test: [
          /\.svg$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
          emit: false,
        },
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = false;',
      raw: true,
      include: /\.js$/,
    }),
  ],
};

module.exports = [
  browserConfig,
  serverConfig,
];
