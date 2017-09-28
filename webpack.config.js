const webpack = require('webpack')
const path = require('path')

module.exports = env => {
  const config = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js']
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: false
    },
    devServer: {
      historyApiFallback: true
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
  }

  return config
}
