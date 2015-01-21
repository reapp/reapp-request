var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({ "global.GENTLY": false }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.COMPRESS)
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    })
  );

module.exports = {
  target: 'web',

  output: {
    libraryTarget: 'var'
  },

  externals: {
    bluebird: 'Bluebird'
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: '6to5-loader?experimental'
      }
    ]
  },

  plugins: plugins
};