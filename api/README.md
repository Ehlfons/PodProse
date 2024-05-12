## Requirements

+ MySQL:
  + Server
  + Workbench
  + Shell

+ NodeJs
  + NPM

+ Docker container:
  + Dockerfile
    + docker build -t mysql-image .
    + docker run --name mysql-container -d -p 3306:3306 -v mysql-data:/var/lib/mysql mysql-image

```Dockerfile
FROM mysql:latest

# Set the root password (change it to whatever you want)
ENV MYSQL_ROOT_PASSWORD=password

# Exposes port 3306 so it can be accessed from other machines
EXPOSE 3306

# Copy the custom configuration file that allows listening on all IP addresses
COPY my.cnf /etc/mysql/my.cnf

# Create a directory for the volume where the data will be stored
VOLUME /var/lib/mysql

# CMD to start MySQL automatically when starting container
CMD ["mysqld", "--user=mysql", "--console"]
```

## DB create tables

```bash
$ npx prisma migrate dev
$ npx prisma generate
```

## DB reset

```bash
$ npx prisma migrate reset
```

## DB graphical environment

```bash
$ npx prisma studio
```

## Insert data

> Insert 4 users

```bash
$ npm run seed
```

> Insert 300 users

```bash
$ npm run factory
```

## .env file

DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_bd"

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

# Nest is [MIT licensed](LICENSE).

## Swagger URL

http://localhost:3000/api/

# API Documentation

**AuthController:**

- POST /auth/register: User register.
- POST /auth/login: Login.
- GET /auth/user: Get authenticated user information.

**UsersController:**

- POST /users: Create a new user.
- GET /users: Get all users.
- GET /users/:id: Get information about a specific user.
- PATCH /users/:id: Update user information.
- DELETE /users/:id: Delete a user.