
const path = require('path')
const fs = require('fs')
const t = require('tap')

/**
 * @param {object} option
 * @param {boolean} option.snapshot true (will update) or false (will do nothing)
 * @param {string} option.file the basename of the cache file
 */
const runner = (option, examples, tests) => {
  if (!option.file) {
    throw new Error('Cache file must be set')
  }
  let SNAP = option.snapshot
  const snpashot = path.join(__dirname, '../snapshots', option.file)
  const snapshotsExist = fs.existsSync(snpashot)
  if (!snapshotsExist) {
    SNAP = true
  }
  const snapshots = snapshotsExist ? JSON.parse(fs.readFileSync(snpashot)) : {}
  const utilized = []

  examples.forEach((data) => {
    tests.forEach((test) => {
      const result = test.fn(data)
      const id = test.id(data)
      if (SNAP) {
        snapshots[id] = result
      }
      if (!snapshots[id]) {
        throw new Error(`Snapshot "${option.file}" did not contain case for "${id}"`)
      }
      utilized.push(id)
      t.same(result, snapshots[id], `Snapshot "${option.file}" did not match for "${id}"`)
    })
  })

  const keys = Object.keys(snapshots)
  if (utilized.length !== keys.length) {
    const duplicates = utilized.filter((key) => !keys.includes(key)).join(', ')
    if (duplicates.length) {
      throw new Error(`Snapshot duplicates found: ${duplicates}`)
    } else {
      throw new Error(`Snapshots discrepancy, ensure not using duplicate keys anywhere`)
    }
  }

  if (SNAP) {
    fs.writeFileSync(snpashot, JSON.stringify(snapshots, null, 2))
  }
}

const suite = {
  just: value => value,
  two: value => `${value} ${value}`,
  quotes: value => `"${value}"`,
  prefixed_equal: value => `=${value}`,
}

/**
 * @param {object} option
 * @param {boolean} option.snapshot true (will update) or false (will do nothing)
 * @param {string} option.file the basename of the cache file
 */
function runSuite (option, tests, handler) {
  runner(option, tests, Object.entries(suite).map(([prefix, valueTransforer]) => ({
    id: ({ example }) => `${prefix}_${example.key}`,
    fn: ({ example, ...rest }) => {
      const value = valueTransforer(example.value)
      return handler({ value, ...rest })
    },
  })))
}

module.exports = {
  runner,
  runSuite,
}
