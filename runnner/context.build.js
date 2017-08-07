let ctx = require.context(__targetDir, true, __targetRx)
let examples = ctx.keys().map((moduleKey, i) => {
  let mountDir = encodeURI(moduleKey.split('/').slice(-2)[0])
  return {mountDir, app: ctx(moduleKey).default}
})

export default examples
