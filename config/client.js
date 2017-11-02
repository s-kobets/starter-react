const webpack = require('webpack');
const merge = require('webpack-merge');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const baseConfig = require('./base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
	entry: {
		app: './src/entry-client.js'
	},

	plugins: [
      // Важно: это разбивает webpack runtime на главный фрагмент так,
      // чтобы асинхронные части могли быть внедрены сразу после него.
      // Это также позволяет лучше кэшировать код вашего приложения / вендоров.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new HtmlWebpackHarddiskPlugin()
	]
});

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new ContextReplacementPlugin(/moment[\/\\]locale$/, /(en-gb|ru).js$/),

		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
} else {
	module.exports.plugins = (module.exports.plugins || []).concat([
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 9999
    // })
	]);
}
