import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

interface ExtendedConfiguration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

const config: ExtendedConfiguration = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'ts-treeview.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TsTreeView', // グローバル変数としてアクセス可能にするためのライブラリ名
    libraryTarget: 'umd', // UMD形式で出力
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: './', globOptions: { ignore: ['**/index.html'] } },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};

export default config;
