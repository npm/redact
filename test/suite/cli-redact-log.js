const t = require('tap')
const { runner } = require('../fixtures/runner')
const { examples, testCases, handlers } = require('../fixtures/suite')

const { cliRedactLog } = handlers

runner(examples, testCases, { cliRedactLog }, ({ result, id }) => {
  t.matchSnapshot(result, id)
})
