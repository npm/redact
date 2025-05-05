# Changelog

## [3.2.2](https://github.com/npm/redact/compare/v3.2.1...v3.2.2) (2025-05-05)
### Bug Fixes
* [`254415e`](https://github.com/npm/redact/commit/254415e161a42d8d7691cd0abbf8069b7da2ca73) [#45](https://github.com/npm/redact/pull/45) check if buffer is available instead of using Buffer module (#45) (@reggi)

## [3.2.1](https://github.com/npm/redact/compare/v3.2.0...v3.2.1) (2025-05-02)
### Bug Fixes
* [`2aca0ac`](https://github.com/npm/redact/commit/2aca0ac6ed9f4ce2090b3780ceba2786d1d920df) [#42](https://github.com/npm/redact/pull/42) check if Buffer is available (#42) (@reggi)
### Chores
* [`40f41d9`](https://github.com/npm/redact/commit/40f41d969a50bb2918aeb149cea74c69c3c68111) [#43](https://github.com/npm/redact/pull/43) adds codeql workflow (#43) (@reggi)
* [`ce4294a`](https://github.com/npm/redact/commit/ce4294a8b971930fe69bb313f22d47523c9090a4) [#41](https://github.com/npm/redact/pull/41) bumping @npmcli/template-oss from 4.23.3 to 4.24.3 (#41) (@owlstronaut)

## [3.2.0](https://github.com/npm/redact/compare/v3.1.1...v3.2.0) (2025-04-21)
### Features
* [`e30b453`](https://github.com/npm/redact/commit/e30b453db65dcf450242b5a187a9d78f2bc049fa) [#39](https://github.com/npm/redact/pull/39) adds cookie to redaction list (#39) (@reggi)
### Chores
* [`9868381`](https://github.com/npm/redact/commit/98683815f691bf135cf2da78ce51a88b1926559b) [#36](https://github.com/npm/redact/pull/36) use `throws` and `rejects` assertions (#36) (@hashtagchris)

## [3.1.1](https://github.com/npm/redact/compare/v3.1.0...v3.1.1) (2025-01-29)
### Bug Fixes
* [`f509ae4`](https://github.com/npm/redact/commit/f509ae42be6479339335b4dfcd1c62ea11c92b3c) [#34](https://github.com/npm/redact/pull/34) server: redactThrow should return function (#34) (@reggi)

## [3.1.0](https://github.com/npm/redact/compare/v3.0.0...v3.1.0) (2025-01-29)
### Features
* [`d1837d1`](https://github.com/npm/redact/commit/d1837d1679fcf6634b087ffeed339c2efb858604) [#32](https://github.com/npm/redact/pull/32) server: introduces serializeError and redactError (#32) (@reggi)

## [3.0.0](https://github.com/npm/redact/compare/v2.0.1...v3.0.0) (2024-09-24)
### ⚠️ BREAKING CHANGES
* `@npmcli/redact` now supports node `^18.17.0 || >=20.5.0`
### Bug Fixes
* [`2ffd026`](https://github.com/npm/redact/commit/2ffd0267784c28cfa3564ea9ab1667b88b3fe843) [#28](https://github.com/npm/redact/pull/28) align to npm 10 node engine range (@hashtagchris)
### Chores
* [`864a01a`](https://github.com/npm/redact/commit/864a01a470ceed8f9ea6e19ab8c387fba9442dd2) [#28](https://github.com/npm/redact/pull/28) run template-oss-apply (@hashtagchris)
* [`1d90363`](https://github.com/npm/redact/commit/1d903634b257fc73e8703d6dd8d668e7ff3e7d3e) [#26](https://github.com/npm/redact/pull/26) bump @npmcli/eslint-config from 4.0.5 to 5.0.0 (@dependabot[bot])
* [`96c5285`](https://github.com/npm/redact/commit/96c5285bd08c2228922b712ab1a5d57c38fcf22e) [#27](https://github.com/npm/redact/pull/27) postinstall for dependabot template-oss PR (@hashtagchris)
* [`01daecd`](https://github.com/npm/redact/commit/01daecd5e14650831416ea342b8e3094efb03f8f) [#27](https://github.com/npm/redact/pull/27) bump @npmcli/template-oss from 4.23.1 to 4.23.3 (@dependabot[bot])

## [2.0.1](https://github.com/npm/redact/compare/v2.0.0...v2.0.1) (2024-06-05)

### Bug Fixes

* [`670847f`](https://github.com/npm/redact/commit/670847f25fbbd6780f42d09d36ecc9c6bb68ec9f) [#15](https://github.com/npm/redact/pull/15) filter properties of error (#15) (@reggi)
* [`826b60d`](https://github.com/npm/redact/commit/826b60d6fc76ff4bdbb80dcaf203c8824574b340) [#14](https://github.com/npm/redact/pull/14) prevent redact for buffers (#14) (@reggi)

## [2.0.0](https://github.com/npm/redact/compare/v1.1.0...v2.0.0) (2024-04-26)

### ⚠️ BREAKING CHANGES

* This package now uses package.json exports. The only allowed entry points are `@npmcli/redact` and `@npmcli/redact/server` in addition to the package.json itself.

### Features

* [`a753300`](https://github.com/npm/redact/commit/a75330078fd7f90f94ddc1badd91e4f6904444f9) [#7](https://github.com/npm/redact/pull/7) adds server redact (@reggi)

## [1.1.0](https://github.com/npm/redact/compare/v1.0.0...v1.1.0) (2024-04-03)

### Features

* [`c681d24`](https://github.com/npm/redact/commit/c681d2469583aae4e505e4c1ac16ae48e314093b) [#4](https://github.com/npm/redact/pull/4) add node 16 support (#4) (@lukekarrys)

## 1.0.0 (2024-04-03)

### ⚠️ BREAKING CHANGES

* initial implementation (#1)

### Features

* [`44c4ede`](https://github.com/npm/redact/commit/44c4ede1900e2376c0eb2d68cc088f4c24083627) [#1](https://github.com/npm/redact/pull/1) initial implementation (#1) (@lukekarrys)
