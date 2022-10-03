# Todo App

## Description

* Todo App
  for [Carbmee Full Stack Coding Challenge](https://github.com/carbmee/code_challenges/tree/master/full_stack_challenge)
* Solution focuses on both frontend and backend.

## How to run?

### Backend

* Install dependencies:

```shell
yarn install
```

* Spin up the Docker containers:

```docker
docker-compose build
docker-compose up
```

* Create a `.env` file next to api module's `package.json` file.

```dotenv
NODE_ENV=development
JWT_SECRET=mysecret
REDIS_URL=redis://@127.0.0.1
DATABASE_URL=postgresql://<username>:<password>@localhost:<port>/<dbname>
PORT=3000

```

* Apply migrations:

```shell
npx prisma migrate dev
```

* Create Prisma Client:

```shell
npx prisma generate
```

* Start the development server:

```shell
yarn start:dev
```

* Server should start at port `3000`.

### Frontend

* Install dependencies:

```shell
yarn install
```

* Create a `.env` file next to web module's `package.json` file:

```dotenv
NEXT_PUBLIC_SERVICE_URL=http://localhost:3000
```

* Start the development server:

```shell
yarn dev
```

* Server should start at port `4000`.

## Tech Stack

### Backend

* **NestJS**: A Node.js framework with solid IoC/DI concepts, works out-of-the-box.
* **Passport.js**: Handle JWT access token creation and checking.
* **Prisma**: Fully typesafe modern ORM.
* **argon2**: A modern password hashing algorithm.
* **cache-manager**: In memory cache solution.
* **class-transformer / class-validator**: DTO transformation and validation.
* **helmet**: Alters response headers for increased security.
* **ioredis**: Modern Redis client library.
* **swagger-ui-express**: API documentation.
* **TypeScript**: Typesafe language.
* **ESLint + Prettier**: Creates coding consistency across the project.
* **Husky + lint-staged**: Git hooks + applying lint rules before each commit
* **Docker**: Virtualization and containerization.
* **PostgreSQL**: Modern relational database.

### Frontend

* **Next.js**: Modern React framework with file based routing and SSR options.
* **HeadlessUI**: Unstyled a11y supporting components from the TailwindCSS team.
* **HeroIcons**: Icon library from the TailwindCSS team.
* **Tanstack React Query**: Data fetching and server state management library.
* **axios**: XHR request library.
* **clsx**: A helper library to apply Tailwind class names conditionally.
* **React**: Modern JS library.
* **React Hook Form**: Creating, managing, and validation forms.
* **React Toastify**: Create toast notifications.
* **ESLint + Prettier**: Creates coding consistency across the project.
* **TailwindCSS**: Utility-first CSS framework.
* **TypeScript**: Typesafe language

# Technical Choices

* **NestJS**:
  * Robust and works out-of-the-box.
  * Good DI system.
  * Can write REST, GraphQL, Microservices with a lot of choices.
* **Express vs Fastify**:
  * NestJS can work with either of them.
  * By default, it's Express. Used Express to implement the solution.
  * Can change it to Fastify for a faster system.
  * Some of the middleware dependencies should be effected like cookie-parser or helmet.
  * They can be replaced with their Fastify versions easily.
* **argon2 vs bcrypt**:
  * Both of them are good cryptography solutions and used and battle tested.
  * argon2 offers better parallelization options.
  * Either of them can be used.
* **Prisma vs TypeORM**:
  * TypeORM is the default choice of the NestJS ecosystem.
  * Prisma is a modern solution.
  * Prisma offers end to end type-safety whereas TypeORM lacks this feature.
  * Prisma can nicely work with different types of databases.
  * Example: You can use it with Postgres and then "relatively" easily change it to use Mongo.
* **PostgreSQL vs MongoDB**:
  * I'm comfortable with both solutions but I chose Postgres.
  * It doesn't make much of a different in this case because data don't have many relations.
  * Mongo's aggregation framework could also handle the job.
  * I chose Postgres because of personal liking.
* **class-validator vs zod**:
  * Zod is the newest solution.
  * NestJS ecosystem nicely works with class-validator.
  * NestJS depends on classes and their metadata. Uses reflection.
  * zod depends on type inference and interfaces.
  * Their validation API is similar in terms of capability.
  * Went with the default option.
* **Next.js**:
  * Modern React framework.
  * Works nicely with TypeScript.
  * Has out-of-the-box solution for most of the things. Example:
    * Code splitting
    * SSR
    * File based routing
    * CSS Modules
    * SCSS
    * Image optimization
    * Testing
  * Battle tested and used by many.
  * I chose this mostly because of file based routing and SSR.
  * One of the biggest cons: Increased JS bundle size.
* **HeadlessUI + HeroIcons + TailwindCSS**:
  * I like TailwindCSS, and it was in the tech-stack. I chose it.
  * HeadlessUI and HeroIcons are from the same people behind the Tailwind.
  * They work nicely with Tailwind.
* **Tanstack React Query vs useSWC**:
  * They are server state management libraries.
  * React Query is more mature and has more features.
  * Makes it easier to handle loading and error states.
  * Automatic stale state and data refetch.
* **axios vs fetch API**:
  * Went for Axios, because works nicely with TypeScript.
  * Can add interceptors, will need them in the future for the refresh tokens, for example.
* **React Hook Form**:
  * Great solution for handling form states and validations.
* **jest + React Testing Library**:
  * Most up-to-date solution for unit/component testing for React applications.
  * Testing library also has helpers for DOM testing.
  * Next.js with SWC has great support for Jest. *Almost* automatic configuration.

### Notes

* I wrote a RESTful API.
* I'm comfortable with RESTful and GraphQL, but I haven't written a GraphQL API with NestJS.
* I Didn't want to risk it and went with the REST option.
* I tried to add a couple of tests but because of the time limitation, there are limited number of test cases.

# Future Steps

* [ ] Add refresh tokens.
* [ ] Increase # of tests.
* [ ] Add unit tests / component tests / e2e tests.
* [ ] Convert the solution to a monorepo. Possible solutions:
  * Turborepo
  * Nx
* [ ] Share type definitions between the API and the web submodules.
* [ ] Add Zod - React Hook Form integration to handle form validations in a better way.
* [ ] Add i18n
* [ ] Create more reusable components / Create a component library.
  * Buttons
  * Checkboxes
  * Dialogs
* [ ] Update Tailwind config to reflect the design system values.
  * Colors
  * Spacing
  * Typography
  * Breakpoints
* [ ] Add better a11y features
  * Skip links
  * ARIA attributes
  * Color contrast
  * Reduced motion
