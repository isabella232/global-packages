// Native
const path = require('path')

// Packages
const fs = require('fs-promise')
const {symlinkSync} = require('path-type')
const directory = require('global-modules')

module.exports = () => new Promise((resolve, reject) => {
  // Read contents of global module directory
  const walker = fs.readdir(directory)

  // If everything went fine, directly return the list of modules
  walker.then(modules => {
    for (const item of modules) {
      const index = modules.indexOf(item)
      const fullPath = path.join(directory, item)

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
