# Changelog

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
