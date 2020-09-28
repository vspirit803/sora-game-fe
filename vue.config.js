// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@src', resolve('node_modules/sora-game-core/src'))
      .set('@assets', resolve('node_modules/sora-game-core/assets'))
      .set('@saves', resolve('node_modules/sora-game-core/saves'));
  },
};
