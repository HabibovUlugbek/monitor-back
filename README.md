# Template

## References

- [NodeJS](https://nodejs.org) - [Docs](https://nodejs.org/en/docs) - [GitHub](https://github.com/nodejs)
- [TypeScript](https://www.typescriptlang.org) - [Docs](https://www.typescriptlang.org/docs) -
  [GitHub](https://github.com/microsoft/TypeScript)
- [ESLint](https://eslint.org) - [Docs](https://eslint.org/docs) - [GitHub](https://github.com/eslint)
- [Prettier](https://prettier.io) - [Docs](https://prettier.io/docs/en/index.html) -
  [GitHub](https://github.com/prettier)
- [Jest](https://jestjs.io) - [Docs](https://jestjs.io/docs/getting-started) -
  [GitHub](https://github.com/facebook/jest)
- [NestJS](https://nestjs.com) - [Docs](https://docs.nestjs.com/) - [GitHub](https://github.com/nestjs)
- [Prisma](https://www.prisma.io) - [Docs](https://www.prisma.io/docs) - [GitHub](https://github.com/prisma)
- [Docker](https://www.docker.com) - [Docs](https://docs.docker.com) - [GitHub](https://github.com/docker)
- [Postgres](https://www.postgresql.org) - [Docs](https://www.postgresql.org/docs) -
  [GitHub](https://github.com/postgres)

## Installation dependencies

```bash
$ npm install
```

## Copy .env.example to .env

```bash
$ cp .env.example .env
```

## Build the app

```bash
$ npm run build
```

## Running the app

```bash

# for format code
$ npm run fmt

# in development mode
$ npm run start

# in watch mode
$ npm run start:watch

# in debug mode
$ npm run start:debug

# in production mode
$ npm run start:prod
```

## Testing the app

```bash
# run all tests
$ npm run test

# run all tests in watch mode
$ npm run test:watch

# run all tests in debug mode
$ npm run test:debug

# coverage all tests
$ npm run test:coverage

# run int tests
$ npm run test:int

# run int tests in watch mode
$ npm run test:int:watch

# run int tests in debug mode
$ npm run test:int:debug

# run e2e tests
$ npm run test:e2e

# run e2e tests in watch mode
$ npm run test:e2e:watch

# run e2e tests in debug mode
$ npm run test:e2e:debug
```

## Docs the app

```bash
# build docs
$ npm run docs

# serve docs
$ npm run docs:serve
```

## Prisma

```bash
# format prisma schema
$ npm run prisma:format

# validate prisma schema
$ npm run prisma:validate

# generate prisma client
$ npm run prisma:generate

# create migration
$ npm run migrate:create --name <name> --create-only

# deploy migrations
$ npm run migrate:deploy

# resolve migration
$ npm run migrate:resolve --applied <name>
$ npm run migrate:resolve --rolled-back <name>

# status migrations
$ npm run migrate:status

# reset database
$ npm run migrate:reset
```

## Postgres Container

```bash
# create postgres volume
$ docker volume create postgres_data

# run postgres container
$ docker run \
  --env TZ=UTC \
  --env POSTGRES_DB=postgres \
  --env POSTGRES_USER=postgres \
  --env POSTGRES_PASSWORD=postgres \
  --name postgres \
  --publish 5432:5432 \
  --restart unless-stopped \
  --volume postgres_data:/var/lib/postgresql/data \
  --detach postgres:alpine
```
