// Packages
const fs = require('fs-promise')
const moduleDir = require('global-modules')

module.exports = () => new Promise((resolve, reject) => {
  // Read contents of global module directory
  const walker = fs.readdir(moduleDir)

  // If everything went fine, directly return the list of modules
  walker.then(resolve)

  // If not, hand back the error
  walker.catch(reject)
})
