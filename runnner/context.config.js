var path = require('path')
var glob = require("glob")

function escapeRx(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function makePathRx(paths) {
  return new RegExp(paths.length ? paths.join('$|').concat('$') : '.^')
}

function create(targetDirAbs) {
  let loc = targetDirAbs.replace(/\\/g,'/')
  let pjs = glob.sync(path.join(loc, '/**/package.json'))
  let moduleFriendly = p => escapeRx(path.relative(loc, require.resolve(p)).replace(/\\/g,'/'))
  let targets = pjs.map(pj => moduleFriendly(pj.replace(/\/package\.json$/, '')))
  return {__targetDir: JSON.stringify(loc), __targetRx: makePathRx(targets)}
}

function replaceModule(requireStr) {
  let context = __dirname, request = `./context.build`
  return [new RegExp(`^${escapeRx(requireStr)}$`), resource => Object.assign(resource, {context, request})]
}

module.exports = (targetDir, targetDirAbs) => ({
  definitions: create(targetDirAbs),
  replacement: replaceModule(targetDir)
})
