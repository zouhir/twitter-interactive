/**
 * @module: Framework & Build configuration
 *
 * @developer: Zouhir Chahoud - 11763745
 */

import path from 'path';
import keys from './keys.json';

export default (config, env, helpers) => {
  if(!env.production) {
    config.devServer.contentBase =  path.resolve('resources');  
  }
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  let babelConfig = rule.options;
  //console.log(babelConfig)
  babelConfig.compact= false;

  if(env.production) {
    let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
    plugin.options.sourceMap = false;
    plugin.options.compress.comparisons = false;  
  }
  let definePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  let key = {
    process: {
      env: {
        NODE_ENV: env.production ? JSON.stringify("production") : JSON.stringify("development"),
        MAPBOX_ACCESS_TOKEN: JSON.stringify(keys.mapKey)
      }
    }
  }
  definePlugin.plugin.definitions = key;
};