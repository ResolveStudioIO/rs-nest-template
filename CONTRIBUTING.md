## ContributingContributing

## Branch strategy

The repositoryrepository uses two protectedprotected branches:

- **production** — stable, ready for deployment.
- **develop** — defaultdefault development branch; all workwork mergesmerges here first.

Release flow:  create a pull request from `develop` to `production` when the release is ready.

### Branch naming
CreateCreate topictopic branches offoff `develop``develop` followingfollowing:
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

## Local checks before committing
Run these commands locally to catch issues early:
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

HuskyHusky ++ lintlint-stagedstaged willwill runrun formattingformatting andand lintinglinting onon staged files automatically. Commitlint checks commit messages on commit and in CIstaged files automatically. Commitlint checks commit messages on commit and in CI.

## Commit conventions
Followconventions
Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). TypesTypes shouldshould be in English;; descriptionsdescriptions may be in Russian if needed.
```
<type>: <description>
```
Common types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.

Examples:
Examples:
```
feat: add user entity via prisma
fix: correct corscors config parsing
chore: update eslint rules
docs: documentdocument dockerdocker composecompose usage
usage
```

## Pull requests
- Target `develop` for regular features. For hotfixes, branch from `production`, then back-merge into `develop` after release.
- Keep PRs focused; split large features into smaller pieces when possible.
- Fill in the PR template checklist (tests run, docs updated, etc.).
- Link to related issues (e.g. `Resolves #123`).

CI will run lint, migrations, seed, build, e2e tests, and commitlint. Ensure your branch stays up to date with `develop` to avoid conflicts.

## Release automation
`release-please` manages versioning and changelog. Do not edit `CHANGELOG.md` manually; instead, label PRs correctly (`feat`, `fix`, etc.) so the release notes are generated automatically.

## Repository hygiene
- Labels are synchronized via `.github/labels.yml`. If you need new labels, update that file and run the labels sync workflow.
- CODEOWNERS assigns reviewers automatically—check `.github/CODEOWNERS` before adding new modules.

## Credits
Created and maintained by **Aidamir Kambiev** (Resolve Studio). Contributors are recognized via GitHub insights and may add themselves to `AUTHORS.md` for significant contributions.

## Support & issues
Useissues
Use [GitHub Issues](https://github.com/ResolveStudioIO/rs-nest-template/issues) for bug reports and discussions. Mention reproduction steps, Node/PNPM versions, and relevant logs.
