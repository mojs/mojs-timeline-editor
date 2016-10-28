var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  watch:   true,
  context: __dirname + "/",
  entry: [
    __dirname + '/app/js/app.babel.jsx'
  ],
  module: {
    preLoaders: [
      {
        exclude: /src\//,
        loader: 'source-map'
      }
    ],
    loaders: [
      { test: /\.(json)$/, exclude: /node_modules/, loaders: ['json-loader'] },
      { test: /\.(jsx|.js|babel.jsx|babel.js)$/,
        exclude: /node_modules/,
        loader:  'babel-loader'
      },
      { test: /\.(postcss.css)$/,  loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(eot|woff|ttf|svg|png|jpg|wav|mp3)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      }
    ]
  },
  // NOTE: we have some issues with using calc and auto-math plugins
  // e.g. widht: calc(100% - 165*PX); — doesn't work properly
  postcss: function () {
      return {
          defaults: [ require('precss'), require('postcss-cssnext'), require('postcss-modules'), require('postcss-automath') ],
          cleaner:  [autoprefixer({ browsers: ['last 2 versions'] })]
      };
  },
  output: {
    path:           __dirname + '/app/build/',
    filename:       'mojs-timeline-editor.js',
    publicPath:     'build/',
    library:        'mojs-timeline-editor',
    libraryTarget:  'umd',
    umdNamedDefine: true,
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new UnminifiedWebpackPlugin()
  ],
  // devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  resolve: {
    root: [ path.resolve('./') ],
    moduleDirectories: ['node_modules'],
    target: 'node',
    extensions: [
      '', '.js', '.babel.js', '.babel.jsx',
      '.postcss.css', '.css', '.json'
    ]
  }
};
