module.exports = config => {
  const tsRule = config.module.rules.find(rule => rule.loader === 'ts-loader');

  tsRule.loader = 'babel-loader';
  tsRule.test = /\.tsx?|jsx?$/;
  tsRule.exclude = /node_modules/;
  delete tsRule.options;

  return config;
};
