const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
  mode: 'production',
  entry: './src/browser/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
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
          name: "build/media/[name].[ext]",
          publicPath: url => url.replace(/build/, ''),
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/css/[name].css',
    }),
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = true;',
      raw: true,
      include: /\.js$/
    }),
  ],
  // devtool: "cheap-module-source-map",
  devServer: {
    contentBase: __dirname + '/build',
    compress: true,
    port: 9000
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
          name: 'build/media/[name].[ext]',
          publicPath: url => url.replace(/build/, ''),
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
