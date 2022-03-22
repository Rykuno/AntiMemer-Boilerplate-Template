# AntiMemer FullStack Boilerplate Template

A full stack monorepo boilerplate template for bootstrapping an MVP.

## Todo
- [ ] Add Sendgrid SMTP for password reset/email verification
- [ ] Add Sentry error monitoring/logging
- [ ] Add demo page for relay style cursor based pagination techniques 
- [ ] Add Vercel/Heroku deployment configs and documentation
- [ ] Add Github Actions config
- [ ] Add Doppler option for env config management
- [ ] Add S3 file hosting support

## Overview
- [Inspiration](#inspiration)
- [What's Inside](#whats-inside)
- [Setup](#setup)
- [API](#api)
  - [Instructions](#instructions)
    - [Features](#features)
    - [Overview](#overview)
    - [Prisma Setup](#prisma-setup)
      - [1. Install Dependencies](#1-install-dependencies)
      - [2. PostgreSQL with Docker](#2-PostgreSQL-with-docker)
      - [3. Prisma: Prisma Migrate](#3-prisma-prisma-migrate)
      - [4. Prisma: Prisma Client JS](#4-prisma-client-js)
      - [5. Seed the database data with this script](#5-seed-the-database-data-with-this-script)
      - [6. Start NestJS Server](#6-start-nestjs-server)
    - [GraphQL Playground](#graphql-playground)
    - [Rest Api](#rest-api)
    - [Docker](#docker)
    - [Schema Development](#schema-development)
    - [NestJS - Api Schema](#nestjs---api-schema)
      - [Resolver](#resolver)
    - [GraphQL Client](#graphql-client)


## Inspiration

If somethings worth doing; its worth **OVERDOING** doing with **MAXIMUM EFFORT**. This is especially true when creating fun web service as a meme or weekend project.

In the past I've used various boilerplate configs to boostrap dumb ideas, so I thought I'd upload my own that I use.

## Credit
Here are some open source projects that have been my recent favorites that I used before deciding to piece this one together. 

* https://github.com/NoQuarterTeam/boilerplate;
* https://github.com/vercel/next.js/tree/canary/examples
* https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate
* https://github.com/notiz-dev/nestjs-prisma-starter

## What's inside?

The following is what I define as the Anti-Memer stack,

* React
* Nest.JS
* Next.JS
* PNPM
* Light/Dark Mode
* JWT auth w/ refresh tokens through passport.js
* 100% TypeScript
* Fully Dockerized 
* Rest/GraphQL Interfaces 
* PostgreSQL 
* Prisma ORM
* Example seed data
* Example test cases
* Apollo Client/Server
* Fastify
* Mantine UI
* Husky
* Graphql Code Generator
* Eslint
* Prettier
* Turborepo 

### Apps and Packages

- `api`: A [Nest.js](https://nestjs.com/) app
- `web`: A [Next.js](https://nextjs.org) app
- `ui`: a stub React component library that could be shared amongst apps or micro frontends.
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This repo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (PNPM).

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
pnpx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpx turbo link
```


# API
## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)


## Prisma Setup

### 1. Install Dependencies

Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

```bash
npm i -g @nestjs/cli
```

Install the dependencies for the Nest application:

```bash
npm install
```

### 2. PostgreSQL with Docker

Setup a development PostgreSQL with Docker. Copy [.env.example](./.env.example) and rename to `.env` - `cp .env.example .env` - which sets the required environments for PostgreSQL such as `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`. Update the variables as you wish and select a strong password.

Start the PostgreSQL database

```bash
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db
```

### 3. Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development) to

1. Creates `migration.sql` file
2. Updates Database Schema
3. Generates Prisma Client

```bash
npx prisma migrate dev
# or
npm run migrate:dev
```

If you like to customize your `migration.sql` file run the following command. After making your customizations run `npx prisma migrate dev` to apply it.

```bash
npx prisma migrate dev --create-only
# or
npm run migrate:dev:create
```

If you are happy with your database changes you want to deploy those changes to your [production database](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#applying-migrations-in-production-and-other-environments). Use `prisma migrate deploy` to apply all pending migrations, can also be used in CI/CD pipelines as it works without prompts.

```bash
npx prisma migrate deploy
# or
npm run migrate:deploy
```

### 4. Prisma: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

Generate Prisma Client JS by running

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
npx prisma generate
# or
npm run prisma:generate
```

### 5. Seed the database data with this script

Execute the script with this command:

```bash
npm run seed
```

### 6. Start NestJS Server

Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

Run Nest Server in Production mode:

```bash
npm run start:prod
```

GraphQL Playground for the NestJS Server is available here: http://localhost:3000/graphql

**[⬆ back to top](#overview)**

## GraphQL Playground

Open up the [example GraphQL queries](graphql/auth.graphql) and copy them to the GraphQL Playground. Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`. Add the `accessToken`as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` here:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Docker

Nest server is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your Nest server.

Now to build a Docker image of your own Nest server simply run:

```bash
# give your docker image a name
docker build -t <your username>/nest-prisma-server .
# for example
docker build -t nest-prisma-server .
```

After Docker build your docker image you are ready to start up a docker container running the nest server:

```bash
docker run -d -t -p 3000:3000 --env-file .env nest-prisma-server
```

Now open up [localhost:3000](http://localhost:3000) to verify that your nest server is running.

When you run your NestJS application in a Docker container update your [.env](.env) file

```diff
- DB_HOST=localhost
# replace with name of the database container
+ DB_HOST=postgres

# Prisma database connection
+ DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```

If `DATABASE_URL` is missing in the root `.env` file, which is loaded into the Docker container, the NestJS application will exit with the following error:

```bash
(node:19) UnhandledPromiseRejectionWarning: Error: error: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:3
   |
 2 |   provider = "postgresql"
 3 |   url      = env("DATABASE_URL")
```

### Docker Compose

You can also setup a the database and Nest application with the docker-compose

```bash
# building new NestJS docker image
docker-compose build
# or
npm run docker:build

# start docker-compose
docker-compose up -d
# or
npm run docker
```

## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
npx prisma generate
# or in watch mode
npx prisma generate --watch
# or
npm run prisma:generate
npm run prisma:generate:watch
```

**[⬆ back to top](#overview)**

## NestJS - Api Schema

The [schema.graphql](./src/schema.graphql) is generated with [code first approach](https://docs.nestjs.com/graphql/quick-start#code-first) from the models, resolvers and input classes.

You can use [class-validator](https://docs.nestjs.com/techniques/validation) to validate your inputs and arguments.

### Resolver

To implement the new query, a new resolver function needs to be added to `users.resolver.ts`.

```ts
@Query(returns => User)
async getUser(@Args() args): Promise<User> {
  return await this.prisma.client.user(args);
}
```

Restart the NestJS server and this time the Query to fetch a `user` should work.

**[⬆ back to top](#overview)**

## GraphQL Client

A GraphQL client is necessary to consume the GraphQL api provided by the NestJS Server.

Checkout [Apollo](https://www.apollographql.com/) a popular GraphQL client which offers several clients for React, Angular, Vue.js, Native iOS, Native Android and more.


**[⬆ back to top](#overview)**
