const t = require('tap')
const { runner } = require('../fixtures/runner')
const { examples, testCases, handlers } = require('../fixtures/suite')

const { matchers } = handlers

runner(examples, testCases, { matchers }, ({ result, id }) => {
  t.matchSnapshot(result, id)
})
