const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: isProd ? '/kakeibo' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false
}