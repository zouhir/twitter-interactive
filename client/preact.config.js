import path from 'path';

export default (config, env, helpers) => {
	config.devServer.contentBase =  path.resolve('resources');
	let { plugin } = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0];
	plugin.options.CDN_ENV = env.production ? `-prd` : `-sit`;
};