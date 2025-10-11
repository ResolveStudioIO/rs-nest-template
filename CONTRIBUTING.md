## Branch Strategy

The repository uses two protected branches:

- **production** — stable and ready for deployment.
- **develop** — the default development branch where all work lands first.

When a release is ready, create a pull request from `develop` to `production`.

### Branch Naming
Create topic branches off `develop` using the convention:
```
RSNT-<ISSUE_NUMBER>-<short-description>
```
Examples:
```
RSNT-12-add-user-entity
RSNT-45-fix-cors-config
RSNT-77-update-eslint-rules
```
`RSNT` stands for **rs-nest-template** and keeps naming consistent across Resolve Studio repositories.

## Local Checks
Run these commands before pushing a branch:
```bash
pnpm lint          # ESLint with --max-warnings=0
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests (requires PostgreSQL, e.g. docker compose up)
```
If you modify Prisma models or migrations, also run:
```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed   # Optional: refresh local data
```

Husky and lint-staged execute formatting and linting on staged files automatically. Commitlint validates commit messages locally and in CI.

## Commit Conventions
Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Types should be in English; descriptions may use Russian when helpful.
```
<type>: <description>
```
Common types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.

Examples:
```
feat: add user entity via prisma
fix: correct cors config parsing
chore: update eslint rules
docs: document docker compose usage
```

## Pull Requests
- Target `develop` for features and regular fixes. For hotfixes, branch from `production`, then back-merge into `develop` after release.
- Keep PRs focused; split large changes into smaller pieces when possible.
- Fill in the PR template checklist (tests run, docs updated, etc.).
- Link related issues (e.g. `Resolves #123`).

CI runs linting, migrations, seeding, build, e2e tests, and commitlint. Keep your branch in sync with `develop` to avoid merge conflicts.

## Release Automation
`release-please` manages semantic versioning and changelog updates. Do not edit `CHANGELOG.md` manually; label pull requests correctly (`feat`, `fix`, etc.) so release notes are generated automatically.

## Repository Hygiene
- Labels are synchronized through `.github/labels.yml`. Update that file and rerun the sync workflow if new labels are required.
- CODEOWNERS assigns reviewers automatically—check `.github/CODEOWNERS` before adding new modules.

## Credits
Created and maintained by **Aidamir Kambiev** (Resolve Studio). Contributors are recognized via GitHub insights and may add themselves to `AUTHORS.md` for significant contributions.

## Support & Issues
Use [GitHub Issues](https://github.com/ResolveStudioIO/rs-nest-template/issues) for bug reports and discussions. Provide reproduction steps, Node/PNPM versions, and relevant logs.
