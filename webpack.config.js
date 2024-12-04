const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	devtool: isDevelopment ? 'eval-source-map' : 'source-map',
	entry: {
		bundle: path.resolve(__dirname, 'src', 'index.tsx')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public')
		},
		hot: true,
		port: 3000,
		open: true
	},
	plugins: [
		isDevelopment && new ReactRefreshWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
			scriptLoading: 'blocking'
		})
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.(j|t)sx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							isDevelopment && require.resolve('react-refresh/babel')
						].filter(Boolean)
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				exclude: /node_modules/,
				type: 'asset/resource'
			}
		]
	}
};
