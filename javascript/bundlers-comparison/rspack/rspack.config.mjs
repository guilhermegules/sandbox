import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';

export default defineConfig({
  entry: {
    main: './src/main.jsx',
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'ecmascript', jsx: true },
              transform: { react: { runtime: 'automatic' } },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    port: 3003,
  },
});
