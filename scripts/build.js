const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

function init(){
  console.log('Compiling...');
  webpack(webpackConfig).run(onCompilationSuccess);
}

function onCompilationSuccess(err, stats){
  if(!err) {
    generateServiceWorkFile(formatAssets(Object.keys(stats.compilation.assets)));
    console.log('Compiled successfully!');
  }
}

function formatAssets(assets){
  return JSON.stringify([
    ...assets.map(filepath => `/${filepath}`),
    ...getThirdPartyAssets()
  ]);
}

function generateServiceWorkFile(assets){
  const originDir = path.resolve(__dirname, '../src/base/workers');
  const targetDir = path.resolve(__dirname, '../dist');
  const filename = 'main-sw.js';
  const data = fs.readFileSync(`${originDir}/${filename}`, 'utf-8');
  fs.writeFileSync(
    `${targetDir}/${filename}`,
    data.replace('{version}', Date.now()).replace('const ASSETS = [];', `const ASSETS = ${assets};`)
  );
}

function getThirdPartyAssets(){
  return [
    'https://rsms.me/inter/inter.css',
    'https://rsms.me/inter/font-files/Inter-Bold.woff2?v=3.19',
    'https://rsms.me/inter/font-files/Inter-Light.woff2?v=3.19'
  ];
}

init();
