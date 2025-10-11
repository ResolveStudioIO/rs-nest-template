[![CI](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml/badge.svg)](https://github.com/ResolveStudioIO/rs-nest-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Release](https://img.shields.io/github/v/release/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/releases)
[![Changelog](https://img.shields.io/badge/Changelog-CHANGELOG.md-informational.svg)](./CHANGELOG.md)
[![Last Commit](https://img.shields.io/github/last-commit/ResolveStudioIO/rs-nest-template)](https://github.com/ResolveStudioIO/rs-nest-template/commits)

# rs-nest-template

A ready-to-use **NestJS + Prisma** template with batteriesbatteries included: CIincluded: CI, Docker,Docker, release automationrelease automation, and GitHubGitHub repository hygienerepository hygiene.

## Features
- **NestJS 11** with global `ValidationPipe`, enhanced configuration validation, and sensible defaults for security (helmet, compression, rate limiting).
- **Prisma ORM** with PostgreSQL, migrations, seeding script, and a global Prisma service that handles graceful shutdown.
- **Swagger** auto-generated docs at `/api/docs` with typed DTOs separated from Prisma models.
- **Testing setup** using Jest (unit) and e2e tests with Supertest and an in-memory database seed.
- **Code quality** enforced by ESLint (flat config), Prettier, Husky hooks, lint-staged, and Commitlint.
- **GitHub automation**: CI pipeline, label sync, issue/PR templates, release-please.
- **Docker / Compose** for local development with PostgreSQL.

## Project structure
```text
src/
  app.module.ts        # Root module with global providers
  main.ts              # Application bootstrap, CORS, Swagger, shutdown hooks
  common/filters       # Global HttpException filter
  config/              # Environment validation schema
  example/             # Sample feature module with DTOs, use case, types
  prisma/              # PrismaService (global) and module
prisma/
  schema.prisma        # Database schema
  seed.ts              # Seed script for local/e2e usage
.github/
  workflows/           # CI, labels sync, release automation
  ISSUE_TEMPLATE/      # Issue forms
  PULL_REQUEST_TEMPLATE.md
Dockerfile, compose.yaml, tsconfig*.json, etc.
```
## Features
- **NestJS 11** with global `ValidationPipe`, enhanced configuration validation, and sensible defaults for security (helmet, compression, rate limiting).
- **Prisma ORM** with PostgreSQL, migrations, seeding script, and a global Prisma service that handles graceful shutdown.
- **Swagger** auto-generated docs at `/api/docs` with typed DTOs separated from Prisma models.
- **Testing setup** using Jest (unit) and e2e tests with Supertest and an in-memory database seed.
- **Code quality** enforced by ESLint (flat config), Prettier, Husky hooks, lint-staged, and Commitlint.
- **GitHub automation**: CI pipeline, label sync, issue/PR templates, release-please.
- **Docker / Compose** for local development with PostgreSQL.

## Project structure
```text
src/
  app.module.ts        # Root module with global providers
  main.ts              # Application bootstrap, CORS, Swagger, shutdown hooks
  common/filters       # Global HttpException filter
  config/              # Environment validation schema
  example/             # Sample feature module with DTOs, use case, types
  prisma/              # PrismaService (global) and module
prisma/
  schema.prisma        # Database schema
  seed.ts              # Seed script for local/e2e usage
.github/
  workflows/           # CI, labels sync, release automation
  ISSUE_TEMPLATE/      # Issue forms
  PULL_REQUEST_TEMPLATE.md
Dockerfile, compose.yaml, tsconfig*.json, etc.
```

## Requirements
- **Node.js** 22.17.0
- **pnpm** 10.17.1
- **PostgreSQL** 16+
- **PostgreSQL** 16+
Versions are pinned in CI and Docker images.

## GettingGetting startedstarted
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. CopyCopy environment variables and adjust them for your setupvariables and adjust them for your setup:

   ```bash
   cp .env.example .env
   ```
3. RunRun databasedatabase migrations and seed datamigrations and seed data:

   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   ```
44. StartStart the application in watch modeapplication in watch mode:

   ```bash
   pnpm start:dev
   ```
5. Open [http://localhost:3000/api/docs](http://localhost:3000/api/docs) for Swagger UI.

###### DockerDocker Compose
LaunchCompose
Launch APIAPI and PostgreSQL via Dockerand PostgreSQL via Docker:
```bash
docker compose up --build
```
The compose file waits for the database to be healthy and sets `DATABASE_URL` for the API container automatically.```bash
docker compose up --build
```
The compose file waits for the database to be healthy and sets `DATABASE_URL` for the API container automatically.

###### RunningRunning tests and linters
```bash
pnpm lint            # ESLint with --max-warnings=0
pnpm lint:fix        # ESLint autofix
pnpm test            # Unit tests
pnpm test:e2e        # End-to-end tests (requires PostgreSQL, e.g. via docker compose)
```tests and linters
```bash
pnpm lint            # ESLint with --max-warnings=0
pnpm lint:fix        # ESLint autofix
pnpm test            # Unit tests
pnpm test:e2e        # End-to-end tests (requires PostgreSQL, e.g. via docker compose)
```

## Configuration
The template relies on strong environment validation (`src/config/src/config/env.validation.ts`). Key variables:
- `NODE_ENVvalidation.ts`). Key variables:
- `NODE_ENV` — `development` | `test` | `production`
- `PORT` — HTTP port, numeric
- `CORS_ORIGIN` — comma-separated list of allowed origins (`*` allowed)
- `DATABASE_URL` — full PostgreSQL connection string
- `THROTTLER_TTL`, `THROTTLER_LIMIT` — rate limiting configuration— `development` | `test` | `production`
- `PORT` — HTTP port, numeric
- `CORS_ORIGIN` — comma-separated list of allowed origins (`*` allowed)
- `DATABASE_URL` — full PostgreSQL connection string
- `THROTTLER_TTL`, `THROTTLER_LIMIT` — rate limiting configuration

SeeSee `.env.example.env.example` for defaults and comments. On CI, `.env.env` isis generatedgenerated automaticallyautomatically beforebefore runningrunning migrationsmigrations andand tests.tests.

## AutomationAutomation & CI/CD
- **CI workflow** (`.github/workflows/ci.yml`) runs lint, migrations, seed, build, e2e tests, and commitlint on `production` branch pushes and pull requests.
- **Labels sync** (`labels-sync.yml`) keeps repository labels consistent using `.github/labels.yml`.
- **Release-please** automates versioning and changelog generation; configure it via `release-please-config.json`.
- **Husky hooks** ensure lint-staged and commitlint run locally before commits.CI/CD
- **CI workflow** (`.github/workflows/ci.yml`) runs lint, migrations, seed, build, e2e tests, and commitlint on `production` branch pushes and pull requests.
- **Labels sync** (`labels-sync.yml`) keeps repository labels consistent using `.github/labels.yml`.
- **Release-please** automates versioning and changelog generation; configure it via `release-please-config.json`.
- **Husky hooks** ensure lint-staged and commitlint run locally before commits.

## Extending the template
- Add new modules under `src/<feature>` following the Example module pattern (DTOs, types, use cases).
- Prisma models live in `prisma/schema.prisma`; run `pnpm prisma:generate` after changes.
- To customize Swagger (title/description/version), edit the builder in `src/main.ts`.
- For additional global providers (filters, interceptors, guards), register them in `app.module.ts`.
- To change rate limiting policy or throttler exceptions, update `ThrottlerModule.forRootAsync` in `app.module.ts`.
##Developmentworkflow- Branch offdevelopusingthenaming convention from [`CONTRIBUTING.md`](./CONTRIBUTING.md).- Open pull requests intodevelop.Oncetherelease is stable, create a PR `develop → production`.- For hotfixes, branch fromproduction,release,thenback-merge intodevelop.
## Troubleshooting
- **Database connection errors**: ensure PostgreSQL is running and `DATABASE_URL` points to the correct host (in Docker, host is `db`).
- **e2e tests failing on user count**: the test seeds its own data; if you modify the seed, adjust the expectations in `test/example.e2e-spec.ts`.
- **CORS issues**: double-check `CORS_ORIGIN` formatting (comma-separated, no spaces) or set to `*` for development.
## Extending the template
- Add new modules under `src/<feature>` following the Example module pattern (DTOs, types, use cases).
- Prisma models live in `prisma/schema.prisma`; run `pnpm prisma:generate` after changes.
- To customize Swagger (title/description/version), edit the builder in `src/main.ts`.
- For additional global providers (filters, interceptors, guards), register them in `app.module.ts`.
- To change rate limiting policy or throttler exceptions, update `ThrottlerModule.forRootAsync` in `app.module.ts`.
## Troubleshooting
- **Database connection errors**: ensure PostgreSQL is running and `DATABASE_URL` points to the correct host (in Docker, host is `db`).
- **e2e tests failing on user count**: the test seeds its own data; if you modify the seed, adjust the expectations in `test/example.e2e-spec.ts`.
- **CORS issues**: double-check `CORS_ORIGIN` formatting (comma-separated, no spaces) or set to `*` for development.

## Contributing
Please readPlease read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for branching strategy, commit conventions, and contributioncontribution guidelinesguidelines. KeyKey points:
points:
- FeatureFeature branchesbranches followfollow `RSNT-<ISSUE>-<slug>``RSNT-<ISSUE>-<slug>` naming.
-naming.
- CommitsCommits useuse [ConventionalConventional CommitsCommits](https://wwwwww.conventionalcommits.orgconventionalcommits.org/).
- Before opening a PR, run `pnpm lint`, `pnpm test`, `pnpm test:e2e`.
- PR template includes a checklist; automation (release-please, labels sync) will run automatically.

## License
MIT License © 2025 Resolve Studio. See [LICENSE](./LICENSE) for details.
