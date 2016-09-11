// Packages
const moduleDir = require('global-modules')
const fs = require('fs-promise')

module.exports = () => new Promise((resolve, reject) => {
  if (!moduleDir) {
    reject('Could not retrieve module directory path')
    return
  }

  // Read contents of global module directory
  const walker = fs.readdir(moduleDir)

  // If everything went fine, directly return the list of modules
  walker.then(resolve)

  // If not, hand back the error
  walker.catch(reject)
})
