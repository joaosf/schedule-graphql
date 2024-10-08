# A GraphQL API with Prisma and TypeScript

## Util Commands

Here are some useful commands for managing the project:

- **Install dependencies**:
  ```sh
  npm install
  ```

- **Run the development server**:
  ```sh
  npm run dev
  ```

- **Build the project**:
  ```sh
  npm run build
  ```

- **Run tests**:
  ```sh
  npm test
  ```

- **Prisma Client**
  - Commands should run on `src/graphql` folder
  - **Generate Prisma client**: 
    ```sh
    npx prisma generate
    ```

  - **Prisma client studio (to test entities**:
    ```sh
    npx prisma studio
    ```

## Architecture

- **GraphQL** (`/src/graphql`): Contains the GraphQL schema, and migration files.
- **Prisma** (`/src//prisma`): Contains the Prisma client consumed by the GraphQL resolvers.
- **Interfaces** (`/src/interfaces`): Contains the TypeScript interfaces used in the project.
- **Resolvers** (`/src/resolvers`): Contains the GraphQL resolvers that handle incoming queries and mutations.
- **Schemas** (`/src/schemas`): Contains the gql scripts for the GraphQL schema.

## Unit Tests

- **Focus**: I've created unit tests to make sure that the resolvers and schemas are working as expected.
- **Script Default**:
  1. **Arrange**: Set up the test data and mocks.
  2. **Act**: Call the function or method being tested.
  3. **Assert**: Check the results and make assertions.

## Plugins Used

### 1. `@prisma/client`
- **Purpose**: Prisma Client is an auto-generated and type-safe query builder for Node.js & TypeScript.
- **Why Use**: It simplifies database access and provides type safety, reducing runtime errors.

### 2. `apollo-server-express`
- **Purpose**: A GraphQL server library for Express.js.
- **Why Use**: It helps in building a GraphQL server with Express.js, providing a flexible and scalable solution.

### 3. `@graphql-tools/utils`
- **Purpose**: A set of utilities for working with GraphQL schemas and operations.
- **Why Use**: It helps in building and managing GraphQL schemas and resolvers efficiently.

### 4. `typescript`
- **Purpose**: A strongly typed programming language that builds on JavaScript.
- **Why Use**: It provides static type checking, which helps in catching errors early during development.

### 5. `prettier`
- **Purpose**: An opinionated code formatter that enforces a consistent coding style.
- **Why Use**: It helps in maintaining a consistent code style across the project.

### 6. `dotenv`
- **Purpose**: A zero-dependency module that loads environment variables from a `.env` file.
- **Why Use**: It simplifies the process of managing environment variables in development.

### 7. `jest`
- **Purpose**: A testing framework that focuses on simplicity and flexibility.
- **Why Use**: It helps in writing and running tests to ensure the correctness of the application.

### 8. `jest-mock`
- **Purpose**: A library for mocking functions and modules in Jest tests.
- **Why Use**: It helps in isolating the code under test and mocking dependencies for unit testing.

## How to Configure Docker with MySQL for Testing

To set up a MySQL database using Docker for testing purposes, follow these steps:

- Prerequisites:
  - [Docker](https://www.docker.com/get-started) installed on your machine.

1. **Run a MySQL Docker container**:
    ```sh
    docker run --name postgres-container -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
    ```
   - This will create a new Docker container with a MySQL database running on port `5432`.


2. **Check the logs of the container**:
    ```sh
    docker logs postgres-container
    ```

3. **Check the status of the container**:
    ```sh
    docker ps
    ```

4. **Connect to the MySQL database**:
    - Use a MySQL client or a tool like `mysql` CLI:
      ```sh
      mysql -h 127.0.0.1 -P 3306 -u user -p
      ```

5. **Configure Prisma to use the Docker MySQL instance**:
    - Update your `.env` file with the following:
      ```env
      DATABASE_URL="mysql://user:password@localhost:3306/testdb"
      ```

6. **Generate Prisma client**:
    ```sh
    npx prisma generate
    ```

7. **Run migrations** (if any):
    ```sh
    npx prisma migrate dev
    ```

This setup will allow you to test your application with a MySQL database running in a Docker container.
