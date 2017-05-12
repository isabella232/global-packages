// Native
const path = require('path')

// Packages
const fs = require('fs-promise')
const moduleDir = require('global-modules')
const {symlinkSync} = require('path-type')

module.exports = () => new Promise((resolve, reject) => {
  // Read contents of global module directory
  const walker = fs.readdir(moduleDir)

  // If everything went fine, directly return the list of modules
  walker.then(modules => {
    for (const item of modules) {
      const index = modules.indexOf(item)
      const fullPath = path.join(moduleDir, item)

      modules[index] = {
        name: item,
        linked: symlinkSync(fullPath),
        path: fullPath
      }
    }
    resolve(modules)
  })

  // If not, hand back the error
  walker.catch(reject)
})
