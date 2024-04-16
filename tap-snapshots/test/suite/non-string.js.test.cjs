/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/suite.js TAP non string nonString arrayNumbers just nonString/arrayNumbers/just/serverRedactPreserveType > must match snapshot 1`] = `
Array [
  1,
  2,
  3,
]
`

exports[`test/suite.js TAP non string nonString arrayNumbers just nonString/arrayNumbers/just/serverRedactSafe > must match snapshot 1`] = `
[1,2,3]
`

exports[`test/suite.js TAP non string nonString arrayStrings just nonString/arrayStrings/just/serverRedactPreserveType > must match snapshot 1`] = `
Array [
  "a",
  "b",
  "c",
]
`

exports[`test/suite.js TAP non string nonString arrayStrings just nonString/arrayStrings/just/serverRedactSafe > must match snapshot 1`] = `
["a","b","c"]
`

exports[`test/suite.js TAP non string nonString emptyArray just nonString/emptyArray/just/serverRedactPreserveType > must match snapshot 1`] = `
Array []
`

exports[`test/suite.js TAP non string nonString emptyArray just nonString/emptyArray/just/serverRedactSafe > must match snapshot 1`] = `
[]
`

exports[`test/suite.js TAP non string nonString emptyObject just nonString/emptyObject/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {}
`

exports[`test/suite.js TAP non string nonString emptyObject just nonString/emptyObject/just/serverRedactSafe > must match snapshot 1`] = `
{}
`

exports[`test/suite.js TAP non string nonString false just nonString/false/just/serverRedactPreserveType > must match snapshot 1`] = `
false
`

exports[`test/suite.js TAP non string nonString false just nonString/false/just/serverRedactSafe > must match snapshot 1`] = `

`

exports[`test/suite.js TAP non string nonString null just nonString/null/just/serverRedactPreserveType > must match snapshot 1`] = `
null
`

exports[`test/suite.js TAP non string nonString null just nonString/null/just/serverRedactSafe > must match snapshot 1`] = `

`

exports[`test/suite.js TAP non string nonString number just nonString/number/just/serverRedactPreserveType > must match snapshot 1`] = `
1
`

exports[`test/suite.js TAP non string nonString number just nonString/number/just/serverRedactSafe > must match snapshot 1`] = `
1
`

exports[`test/suite.js TAP non string nonString objectNumbers just nonString/objectNumbers/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {
  "a": 1,
  "b": 2,
  "c": 3,
}
`

exports[`test/suite.js TAP non string nonString objectNumbers just nonString/objectNumbers/just/serverRedactSafe > must match snapshot 1`] = `
{"a":1,"b":2,"c":3}
`

exports[`test/suite.js TAP non string nonString objectStrings just nonString/objectStrings/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {
  "a": "a",
  "b": "b",
  "c": "c",
}
`

exports[`test/suite.js TAP non string nonString objectStrings just nonString/objectStrings/just/serverRedactSafe > must match snapshot 1`] = `
{"a":"a","b":"b","c":"c"}
`

exports[`test/suite.js TAP non string nonString request just nonString/request/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {}
`

exports[`test/suite.js TAP non string nonString request just nonString/request/just/serverRedactSafe > must match snapshot 1`] = `
{}
`

exports[`test/suite.js TAP non string nonString response just nonString/response/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {}
`

exports[`test/suite.js TAP non string nonString response just nonString/response/just/serverRedactSafe > must match snapshot 1`] = `
{}
`

exports[`test/suite.js TAP non string nonString true just nonString/true/just/serverRedactPreserveType > must match snapshot 1`] = `
true
`

exports[`test/suite.js TAP non string nonString true just nonString/true/just/serverRedactSafe > must match snapshot 1`] = `
true
`

exports[`test/suite.js TAP non string nonString undefined just nonString/undefined/just/serverRedactPreserveType > must match snapshot 1`] = `
undefined
`

exports[`test/suite.js TAP non string nonString undefined just nonString/undefined/just/serverRedactSafe > must match snapshot 1`] = `

`

exports[`test/suite.js TAP non string nonStringSensitve arrayNumbers just nonStringSensitve/arrayNumbers/just/serverRedactPreserveType > must match snapshot 1`] = `
Array [
  1,
  "[REDACTED_NPM_SECRET]",
  3,
]
`

exports[`test/suite.js TAP non string nonStringSensitve arrayNumbers just nonStringSensitve/arrayNumbers/just/serverRedactSafe > must match snapshot 1`] = `
[1,"[REDACTED_NPM_SECRET]",3]
`

exports[`test/suite.js TAP non string nonStringSensitve arrayStrings just nonStringSensitve/arrayStrings/just/serverRedactPreserveType > must match snapshot 1`] = `
Array [
  "a",
  "[REDACTED_NPM_SECRET]",
  "c",
]
`

exports[`test/suite.js TAP non string nonStringSensitve arrayStrings just nonStringSensitve/arrayStrings/just/serverRedactSafe > must match snapshot 1`] = `
["a","[REDACTED_NPM_SECRET]","c"]
`

exports[`test/suite.js TAP non string nonStringSensitve object just nonStringSensitve/object/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {
  "headers": Object {
    "nested": Object {},
  },
  "url": "https://username:********@example.com/",
  "values": Object {
    "jwt": "[REDACTED_JSON_WEB_TOKEN]",
    "npm": "[REDACTED_NPM_SECRET]",
  },
}
`

exports[`test/suite.js TAP non string nonStringSensitve object just nonStringSensitve/object/just/serverRedactSafe > must match snapshot 1`] = `
{"url":"https://username:********@example.com/","headers":{"nested":{}},"values":{"jwt":"[REDACTED_JSON_WEB_TOKEN]","npm":"[REDACTED_NPM_SECRET]"}}
`

exports[`test/suite.js TAP non string nonStringSensitve objectNumbers just nonStringSensitve/objectNumbers/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {
  "a": 1,
  "b": "[REDACTED_NPM_SECRET]",
  "c": 3,
}
`

exports[`test/suite.js TAP non string nonStringSensitve objectNumbers just nonStringSensitve/objectNumbers/just/serverRedactSafe > must match snapshot 1`] = `
{"a":1,"b":"[REDACTED_NPM_SECRET]","c":3}
`

exports[`test/suite.js TAP non string nonStringSensitve objectStrings just nonStringSensitve/objectStrings/just/serverRedactPreserveType > must match snapshot 1`] = `
Object {
  "a": "a",
  "b": "[REDACTED_NPM_SECRET]",
  "c": "c",
}
`

exports[`test/suite.js TAP non string nonStringSensitve objectStrings just nonStringSensitve/objectStrings/just/serverRedactSafe > must match snapshot 1`] = `
{"a":"a","b":"[REDACTED_NPM_SECRET]","c":"c"}
`
