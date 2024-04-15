
/**
 * Represents an object with string keys and values.
 * @typedef {{ example: { key: string, value: string }, type: string }} Example
 * @typedef {Record<string, Example>} Examples
 * @typedef {(arg: Example) => string} TestFn
 * @typedef {Record<string, TestFn>} Tests
 * @typedef {({ result: string, id: string }) => void } Handler
 * @typedef {Record<string, Handler>} Handlers
 */

/**
 * Loops over and creates a matrix of exampleGroups, testsCases and handlers
 * @param {Examples} examples
 * @param {Tests} tests
 * @param {Handler} handler
 */
const runner = (exampleGroups, tests, handlers, assertion) => {
  Object.entries(exampleGroups).forEach(([exampleGroupName, exampleGroup]) => {
    exampleGroup.forEach((exampleData) => {
      Object.entries(tests).forEach(([testGroup, test]) => {
        Object.entries(handlers).forEach(([handlerName, handler]) => {
          const value = test(exampleData.example.value)
          const id = [handlerName, testGroup, exampleGroupName, exampleData.example.key].join('_')
          const result = handler({ ...exampleData, value })
          assertion({ result, id })
        })
      })
    })
  })
}

module.exports = {
  runner,
}
