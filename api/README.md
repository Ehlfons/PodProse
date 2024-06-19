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

## Insert data - REQUIRED

```bash
$ npm run megafactory
```

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

## Swagger URL - Api Documentation

http://localhost:3000/api/

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

# Nest is [MIT licensed](LICENSE).