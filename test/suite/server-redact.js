const t = require('tap')
const { runner } = require('../fixtures/runner')
const { examples, testCases, handlers } = require('../fixtures/suite')

const { serverRedact } = handlers

runner(examples, testCases, { serverRedact }, ({ result, id }) => {
  t.matchSnapshot(result, id)
})
