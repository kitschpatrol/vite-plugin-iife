# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-11-02

### Added

- Add Vite 8 support using Rolldown options, preserving strict IIFE execution and Vite 5–7 compatibility.

### Documentation

- Document support for Vite 5, 6, 7, and 8.

### Maintenance

- Remove the redundant runtime dependency on `pretty-bytes`, which is already bundled into the plugin.
- Refresh shared-config, Vitest, Playwright, and pnpm, and constrain TypeScript and Node.js type updates to patch releases.
- Use pnpm's built-in skill synchronization instead of the `skills` dependency and `prepare` script.
- Refresh GitHub Actions and run dependency-update automation monthly.
- Make link checks ignore loopback URLs and allow runs with no links.
- Add a browser test that fetches the imported IIFE URL and verifies its JavaScript response against the string import.

## [2.1.3] - 2026-10-06

### Changed

- **Breaking:** Restrict declared Node.js support to `^20.19.0 || ^22.0.0 || ^24.0.0 || >=26.0.0`, dropping Node.js 21, 23, and 25.

### Documentation

- Correct an overview typo and refresh README badge links.

### Maintenance

- Update the runtime `pretty-bytes` requirement to `^7.2.0`.
- Migrate contributor tooling to shared-config 8, TypeScript 6, Vitest 5, and pnpm 12, updating build/type checks and requiring Node.js `^24.16.0 || >=26.3.0` for development.
- Add automated repository and homepage link checks.
- Add scheduled dependency-update pull request automation.
- Update and pin workflow actions, simplify release automation, and validate version tags against the repository's default branch.
- Add automatic local skill synchronization and VS Code lint/fix tasks with integrated problem reporting.

## [2.1.2] - 2026-05-26

### Maintenance

- Install Playwright Chromium and its system dependencies explicitly in CI, and disable pnpm caching for browser-test setup.
- Refresh shared-config, tsx, and pnpm, and raise the development Node.js minimum to 22.22.2.

## [2.1.1] - 2026-05-16

### Changed

- Send verbose messages through Vite's configured logger instead of `console.log`.

### Documentation

- Expand contribution guidance, document linting and formatting tools, and update README badges and links.

### Maintenance

- Declare `pretty-bytes` as a runtime dependency and mark the package as side-effect-free.
- Add build, lint, and browser-test CI across Linux, macOS, and Windows.
- Update release and metadata automation, accept release tags with or without `v`, and pass npm credentials directly to the publish command.
- Refresh contributor tooling with shared-config 7 and pnpm 11, require Node.js 22.18+ for development, and run tests once by default.

## [2.1.0] - 2026-01-04

### Added

- Support `?iife&url` and `?url&iife` imports with TypeScript declarations, cached development URLs that refresh on source changes, and emitted production assets.

### Fixed

- Build IIFEs using Vite's configured project root instead of the process working directory.

### Documentation

- Add script-inlining and external-script examples and explain when to use string versus URL imports.

### Maintenance

- Extend browser tests to cover URL imports.
- Refresh development dependencies and pnpm.

## [2.0.3] - 2025-12-08

### Maintenance

- Fix contributor-tool hoisting by moving pnpm settings into `pnpm-workspace.yaml`.
- Refresh development dependencies and pnpm, remove the direct Playwright dependency, and normalize package export and publishing metadata.

## [2.0.2] - 2025-11-04

### Maintenance

- Migrate browser tests to Vitest 4 and `@vitest/browser-playwright`, and refresh development dependencies and pnpm.
- Switch local npm publishing from one-time passwords to token authentication.

## [2.0.1] - 2025-10-02

### Maintenance

- Stop minifying the distributed plugin bundle and target Node.js 20.19.0.
- Update the bundled `pretty-bytes` requirement to `^7.1.0`.
- Refresh development dependencies and pnpm, and migrate lint/fix commands from `kpi` to `ksc`.

## [2.0.0] - 2025-09-02

### Added

- Add Vite 7 support while retaining Vite 5 and 6 compatibility.

### Changed

- **Breaking:** Raise the minimum supported Node.js version from 18 to 20.19.0.

### Documentation

- Update installation guidance for the expanded Vite support.

### Maintenance

- Update bundled `pretty-bytes` to version 7.
- Refresh development dependencies, pnpm configuration, and GitHub repository metadata automation.

## [1.2.1] - 2025-03-04

### Changed

- Remove the declared pnpm engine restriction.

### Documentation

- Clarify Vite 5 and 6 compatibility in installation instructions and correct the package repository link.

### Maintenance

- Refresh shared-config, TypeScript, Node.js types, and pnpm.

## [1.2.0] - 2025-02-26

### Added

- Add Vite 6 support while retaining Vite 5 compatibility.

### Documentation

- Add API documentation for the `iife()` plugin factory.

### Maintenance

- Migrate linting and TypeScript configuration to shared-config 5 and refresh the build/test toolchain, including Vitest 3 and pnpm 10.

## [1.1.6] - 2024-09-14

### Maintenance

- Refresh development dependencies and pnpm, align Node.js types with the Node.js 18 minimum, and simplify cleanup and release scripts.

## [1.1.5] - 2024-09-08

### Maintenance

- Fix the repository's Vite test configuration to import the renamed plugin entry point.

## [1.1.4] - 2024-09-07

### Fixed

- Restore declaration generation at the published `dist/index.d.ts` path by aligning the source entry filename with package exports.

## [1.1.3] - 2024-09-07

### Maintenance

- Refresh development dependencies and pnpm, and use `rimraf` in the cleanup script.

## [1.1.2] - 2024-07-14

### Maintenance

- Add Vitest 2 browser snapshot tests using Playwright and Chromium, replacing the manual demo with test fixtures.
- Refresh development dependencies, move repository tooling to pnpm 9, and streamline build, cleanup, and release scripts.
- Update GitHub release and metadata actions and allow manual metadata synchronization.

## [1.1.1] - 2024-06-01

### Maintenance

- Remove the obsolete `esbuild` package keyword.

## [1.1.0] - 2024-05-31

### Changed

- Compile imported IIFEs through Vite/Rollup instead of calling esbuild directly, eliminating the direct esbuild runtime dependency.

### Documentation

- Update the README description and remove the obsolete esbuild implementation note.

### Maintenance

- Include the MIT license file.
- Refresh pnpm and development dependencies, including esbuild, Vite, and Node.js types.

## [1.0.1] - 2024-05-24

### Documentation

- Correct the package description to identify it as a Vite plugin.

## [1.0.0] - 2024-05-24

### Added

- Add the default `iife()` Vite plugin, compiling JavaScript and TypeScript `?iife` imports into bundled, tree-shaken IIFE strings targeting ES6.
- Provide configurable minification (`true`, `false`, or build-only `'auto'`) and optional verbose compilation and size logging.
- Ship an ES module package for Node.js 18+ and Vite 5, exporting `IifePluginOptions` and `vite-plugin-iife/ext` declarations for string imports.

### Documentation

- Document npm installation, Vite and TypeScript setup, plugin options, and script-inlining examples.

### Maintenance

- Set up package builds, declaration generation, shared linting and formatting, and GitHub release and metadata workflows.

[1.0.0]: https://github.com/kitschpatrol/vite-plugin-iife/releases/tag/v1.0.0
[1.0.1]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.0.0...v1.0.1
[1.1.0]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.0.1...v1.1.0
[1.1.1]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.0...v1.1.1
[1.1.2]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.1...v1.1.2
[1.1.3]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.2...v1.1.3
[1.1.4]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.3...v1.1.4
[1.1.5]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.4...v1.1.5
[1.1.6]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.5...v1.1.6
[1.2.0]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.1.6...v1.2.0
[1.2.1]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.2.0...v1.2.1
[2.0.0]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v1.2.1...v2.0.0
[2.0.1]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.0.0...v2.0.1
[2.0.2]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.0.1...v2.0.2
[2.0.3]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.0.2...v2.0.3
[2.1.0]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.0.3...v2.1.0
[2.1.1]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.1.0...v2.1.1
[2.1.2]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.1.1...v2.1.2
[2.1.3]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.1.2...v2.1.3
[2.2.0]: https://github.com/kitschpatrol/vite-plugin-iife/compare/v2.1.3...v2.2.0
