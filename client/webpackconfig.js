const Path = require('path');
const { InjectManifest: InjectWorkboxManifest } = require('workbox-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const PWAManifest = require('webpack-pwa-manifest');

// Function to generate the webpack configuration
function getWebpackConfig() {
  const entryPoints = {
    main: Path.join(__dirname, 'src', 'js', 'index.js'),
    install: Path.join(__dirname, 'src', 'js', 'install.js'),
  };

  const outputConfig = {
    filename: '[name].bundle.js',
    path: Path.resolve(__dirname, 'dist'),
  };

  const htmlPlugin = new HTMLWebpackPlugin({
    template: Path.join(__dirname, 'index.html'),
    title: 'Text Editor',
  });

  const workboxPlugin = new InjectWorkboxManifest({
    swSrc: Path.join(__dirname, 'src-sw.js'),
    swDest: 'src-sw.js',
  });

  const pwaManifestPlugin = new PWAManifest({
    fingerprints: false,
    inject: true,
    name: 'Text Editor',
    short_name: 'Editor',
    description: 'Edit with ease!',
    background_color: '#225ca3',
    theme_color: '#225ca3',
    start_url: './',
    publicPath: './',
    icons: [
      {
        src: Path.resolve('src', 'images', 'logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: Path.join('assets', 'icons'),
      },
    ],
  });

  const rules = [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/transform-runtime'],
        },
      },
    },
  ];

  return {
    mode: 'development',
    entry: entryPoints,
    output: outputConfig,
    plugins: [htmlPlugin, workboxPlugin, pwaManifestPlugin],
    module: {
      rules: rules,
    },
  };
}

module.exports = getWebpackConfig;
