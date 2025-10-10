## Branches

The project uses three main branches:

- **production** — stable, ready for deployment.
- **staging** — pre-release testing branch.
- **develop** — main development branch; all features and fixes are merged here.

Merge flow:
`develop` → `staging` → `production`

CI/CD pipelines and label synchronization are configured for all three branches.

### Branch naming convention
All feature and fix branches must follow this pattern:
```

RSNT-<ISSUE_NUMBER>-<short-description>

```

**Examples:**
```

RSNT-12-add-user-entity
RSNT-45-fix-cors-config
RSNT-77-update-eslint-rules

```

Prefix `RSNT` stands for **rs-nest-template**, keeping branch names consistent across ResolveStudio repositories.

---

## Commits

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention.

- **Type must always be in English**, while the description may be in Russian if needed.
- Format:
```

<type>: <description>

```

### Types
- `feat` — new feature
- `fix` — bug fix
- `chore` — routine task (configs, dependencies, scripts)
- `docs` — documentation changes
- `refactor` — code refactoring without changing behavior
- `test` — adding or updating tests

### Examples
```

feat: add user entity via prisma
fix: correct CORS config parsing
chore: update eslint rules
docs: add swagger documentation for example module

```

## Credits

- The template was created and is maintained by **Aidamir Kambiev** (Resolve Studio).
- All contributors are automatically recognized on GitHub. If you deliver a significant feature or improvement, feel free to add yourself to [`AUTHORS.md`](./AUTHORS.md) in your PR.

## Support & Issues

- Discussion and bug reports are in the section [GitHub Issues](https://github.com/ResolveStudioIO/rs-nest-template/issues).
