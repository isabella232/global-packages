// Packages
const test = require('ava')

// Utilities
const globalPackages = require('.')

test('Output', async t => {
  try {
    await globalPackages()
  } catch (err) {
    console.log(err)
    t.fail()
  }

  t.pass()
})

test('Output is array', async t => {
  const list = await globalPackages()
  t.true(Array.isArray(list))
})
