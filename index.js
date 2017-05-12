// Native
const path = require('path')

// Packages
const fs = require('fs-promise')
const {symlinkSync} = require('path-type')
const which = require('which-promise')

const modulePath = () => new Promise((resolve, reject) => {
  const npmLocation = which('npm')

  npmLocation.then(dir => {
    const globalPath = path.join(dir, '../../lib/node_modules')
    resolve(globalPath)
  })

  npmLocation.catch(reject)
})

module.exports = () => new Promise((resolve, reject) => {
  const moduleDir = modulePath()
  moduleDir.catch(reject)

  moduleDir.then(directory => {
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
})
