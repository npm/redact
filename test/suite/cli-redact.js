const t = require('tap')
const { runner } = require('../fixtures/runner')
const { examples, testCases, handlers } = require('../fixtures/suite')

const { cliRedact } = handlers

runner(examples, testCases, { cliRedact }, ({ result, id }) => {
  t.matchSnapshot(result, id)
})
