[![CI](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml/badge.svg)](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Release](https://img.shields.io/github/v/release/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/releases)
[![Changelog](https://img.shields.io/badge/Changelog-CHANGELOG.md-informational.svg)](./CHANGELOG.md)
[![Last Commit](https://img.shields.io/github/last-commit/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/commits)

# rs-nest-template

A ready-to-use **NestJS + Prisma** template with CI setup, GitHub labels, and Issue Forms.

## Stack
- **NestJS** with `class-validator` / `class-transformer` (global `ValidationPipe`)
- **Swagger** (`/api/docs`)
- **Prisma** + **PostgreSQL**
- **ESLint** + **Prettier**
- **Issue Forms**, **PR template**, automatic **label sync**
- **CI** powered by **GitHub Actions** (`pnpm`)

## Requirements
- **Node.js** 22.17.0
- **pnpm** 10.17.1
  Versions are pinned in CI.

## Quick Start
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create an environment file:

   ```bash
   cp .env.example .env
   ```

   Fill in the environment variables.

3. Generate Prisma Client:

   ```bash
   pnpm prisma:generate
   ```

4. Apply database migrations:

   ```bash
   pnpm prisma:migrate
   ```

5. Run the project:

   ```bash
   pnpm start:dev
   ```

Swagger UI is available at:
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Environment Variables

`.env.example` includes:

* `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
* `NODE_ENV`, `PORT`
* `CORS_ORIGIN` — comma-separated list of allowed domains
* `DATABASE_URL` — Prisma connection string

## Scripts & Tasks

* `pnpm prisma:generate` — generate Prisma Client
* `pnpm prisma:migrate` — run migrations
* `pnpm lint` — run ESLint
* `pnpm build` — build project
* `pnpm test:e2e` — run e2e tests

## CI/CD

The `CI` workflow runs on `push` to `production` and on every `pull_request`.
Steps:

* Checkout repository
* Install pnpm
* Set Node version
* Copy `.env.example` to `.env`
* `pnpm install`
* Generate Prisma Client
* Lint, build, and run e2e tests

Additional automation:

* `labels-sync.yml` for GitHub label synchronization
* Issue Forms & PR templates
* `release-please` for automated releases

## Code Quality

* ESLint + Prettier
* Husky hooks (`pre-commit`, `commit-msg`)
* Commitlint integrated into CI
* `CODEOWNERS` for review assignment

## Containers

Includes `Dockerfile` and `compose.yaml` for local development with PostgreSQL and the application.

## Maintainer

- Aidamir Kambiev — creator of the template and founder of Resolve Studio.
  GitHub: [@Aidamirrrrrr](https://github.com/Aidamirrrrrr)

## Contributors

Thanks to everyone who helps improve this template.

[![Contributors](https://contrib.rocks/image?repo=ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/graphs/contributors)

## Acknowledgements

See [`AUTHORS.md`](./AUTHORS.md) for the full list of authors and acknowledgements.

## Support & Issues

- Discussion and bug reports are in the section [GitHub Issues](https://github.com/ResolveStudioIO/rs-nest-template/issues).

## License

MIT License © 2025 Resolve Studio
Created by Aidamir (@Aidamirrrrrr) as part of the Resolve Studio internal toolkit.

See [LICENSE](./LICENSE) for details.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and the Pull Request template.
