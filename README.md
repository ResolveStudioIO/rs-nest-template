# rs-nest-template

Шаблон NestJS + Prisma с готовыми практиками CI, метками и Issue Forms.

## Стек
- NestJS, class-validator/class-transformer (глобальный `ValidationPipe`)
- Swagger (`/api/docs`)
- Prisma + PostgreSQL
- ESLint + Prettier
- Issue Forms, PR template, автосинхронизация лейблов
- CI на GitHub Actions (pnpm)

## Требования
- Node.js 22.17.0
- pnpm 10.17.1  
  Версии зафиксированы в CI.

## Быстрый старт
1. Установить зависимости:
```bash
  pnpm install
```
2. Создать файл окружения:
```bash
  cp .env.example .env
```  
Заполнить переменные.
3. Сгенерировать Prisma Client:
```bash
  pnpm prisma:generate
```
4. Применить миграции:
```bash
  pnpm prisma:migrate
```
5. Запустить проект:
```bash
  pnpm start:dev
```

Swagger доступен по адресу:  
http://localhost:3000/api/docs

## Переменные окружения
`.env.example` содержит:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `NODE_ENV`, `PORT`
- `CORS_ORIGIN` — список доменов через запятую
- `DATABASE_URL` — строка подключения Prisma

## Скрипты и задачи
- `pnpm prisma:generate` — генерация Prisma Client
- `pnpm prisma:migrate` — миграции
- `pnpm lint` — линтер
- `pnpm build` — сборка
- `pnpm test:e2e` — e2e тесты

## CI/CD
Workflow `CI` запускается на `push` в `production` и на `pull_request`.  
Шаги: checkout, установка pnpm, выбор Node версии, копирование `.env.example` в `.env`, `pnpm install`, генерация Prisma Client, `lint`, `build`, e2e-тесты.

Также настроено:
- `labels-sync.yml` для синхронизации меток
- Issue Forms и PR шаблон
- `release-please` для автоматизации релизов

## Качество кода
- ESLint + Prettier
- Husky hooks (`pre-commit`, `commit-msg`)
- Commitlint в CI
- `CODEOWNERS`

## Контейнеры
В репозитории есть `Dockerfile` и `compose.yaml` для локального запуска PostgreSQL и приложения.

## Лицензия
MIT

## Вклад
Смотрите `CONTRIBUTING.md` и шаблон Pull Request.
