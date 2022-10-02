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
