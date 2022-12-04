const path = require('path');
const tsConfig = require('./tsconfig.json');

console.log('Muriendoooooooo');

const { paths, baseUrl } = tsConfig.compilerOptions;

function withoutWildCards(str) {
  return str.replace('/*', '');
}
/**
 * This takes the paths from Typescript config and returns a
 * webpack compatible map of aliases. This gives us a single
 * point to put our aliases.
 */
module.exports = Object.keys(paths).reduce((acc, key) => {
  const values = paths[key];
  acc[withoutWildCards(key)] = values.map((s) =>
    path.resolve(baseUrl + '/', withoutWildCards(s))
  )[0];

  return acc;
}, {});
