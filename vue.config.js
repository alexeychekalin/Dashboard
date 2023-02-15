let publicPath = process.env.NODE_ENV === 'production' ? './' : './';

module.exports = {
  publicPath,
  productionSourceMap: false,
  devServer:{
    proxy:'http://194.87.101.58'
  }
};