[![CI](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml/badge.svg)](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Release](https://img.shields.io/github/v/release/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/releases)
[![Changelog](https://img.shields.io/badge/Changelog-CHANGELOG.md-informational.svg)](./CHANGELOG.md)
[![Last Commit](https://img.shields.io/github/last-commit/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/commits)

# rs-nest-template

A ready-to-run **NestJS + Prisma** starter that ships with battle-tested tooling: CI, Docker, release automation, and repository hygiene.

## Features

- **NestJS 11** with a global `ValidationPipe`, opinionated security defaults (helmet, compression, throttling), and graceful shutdown hooks.
- **Prisma ORM** for PostgreSQL with migrations, seeding, and a reusable Prisma service module.
- **API documentation** via Swagger at `/api/docs`, with DTOs separated from Prisma models.
- **Testing toolchain** powered by Jest for unit tests and Supertest for e2e checks (seeded in-memory database).
- **Code quality gates** enforced by ESLint (flat config), Prettier, Husky, lint-staged, and Commitlint.
- **GitHub automations** for CI, label sync, release-please, and repository templates.
- **Container-ready** Dockerfile and Compose setup for local development with PostgreSQL.

## Project structure

```text
src/
  app.module.ts        # Root module with global providers and filters
  main.ts              # Bootstrap: CORS, Swagger, shutdown hooks
  common/              # Exception filters and shared utilities
  config/              # Environment validation schemas
  example/             # Sample feature module (DTOs, use cases, types)
  prisma/              # Prisma service + module used across features
prisma/
  schema.prisma        # Database schema
  seed.ts              # Seed script for local + e2e environments
.github/
  workflows/           # CI, label sync, release automation
  ISSUE_TEMPLATE/      # Issue forms (bug report, feature request)
  PULL_REQUEST_TEMPLATE.md
Dockerfile, compose.yaml, tsconfig*.json, etc.
```

## Requirements

- **Node.js** 22.17.0
- **pnpm** 10.17.1
- **PostgreSQL** 16+

Versions are pinned in CI and Docker images to keep local and remote environments consistent.

## Getting started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy the example environment file and adjust values:
   ```bash
   cp .env.example .env
   ```
3. Prepare the database:
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   ```
4. Start the application in watch mode:
   ```bash
   pnpm start:dev
   ```
5. Open Swagger UI at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

### Docker Compose

Spin up the API alongside PostgreSQL:
```bash
docker compose up --build
```
The service waits for the database to become healthy and injects `DATABASE_URL` automatically.

### Tests & linting

```bash
pnpm lint            # ESLint with --max-warnings=0
pnpm lint:fix        # ESLint autofix pass
pnpm test            # Unit tests
pnpm test:e2e        # End-to-end tests (requires a PostgreSQL instance)
```

## Configuration

Environment variables are validated in `src/config/env.validation.ts`. Key options:
- `NODE_ENV` — `development` | `test` | `production`
- `PORT` — HTTP port for the Nest application
- `CORS_ORIGIN` — comma-separated list of allowed origins (`*` allowed in dev)
- `DATABASE_URL` — full PostgreSQL connection string
- `THROTTLER_TTL`, `THROTTLER_LIMIT` — rate limiting configuration

Refer to `.env.example` for defaults. CI generates `.env` automatically before migrations and tests.

## Automation & repository hygiene

- **CI** (`.github/workflows/ci.yml`) runs linting, migrations, seeds, build, e2e tests, and commitlint on pull requests and `production` pushes.
- **Labels sync** keeps repository labels aligned with `.github/labels.yml`.
- **Release-please** handles semantic versioning and changelog generation.
- **Husky** hooks run lint-staged formatting and Commitlint before commits land in the repo.

## Development workflow

- Branch from `develop` using the convention from [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- Open pull requests into `develop`. When the release is ready, merge `develop → production`.
- For hotfixes, branch from `production`, release, then back-merge into `develop`.

## Troubleshooting

- **Database connection errors**: ensure PostgreSQL is running and `DATABASE_URL` points to the correct host (Docker uses `db`).
- **Failing e2e tests**: each test seeds its own data; update expectations in `test/example.e2e-spec.ts` if you modify the seed.
- **CORS issues**: confirm `CORS_ORIGIN` formatting (comma-separated, no spaces) or use `*` for local development.

## Contributors

<a href="https://github.com/ResolveStudioIO/rs-nest-template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ResolveStudioIO/rs-nest-template" alt="Contributors" />
</a>

## Credits

Created and maintained by **Aidamir Kambiev** (Resolve Studio). See [LICENSE](./LICENSE) for details.
