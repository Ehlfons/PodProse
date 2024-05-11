
## URL para Swagger

http://localhost:3000/api/


## Resetear BD
```bash
$ npx prisma migrate reset 
```

## Crear tablas BD
```bash
$ npx prisma generate
$ npx prisma migrate dev
```

## Entorno gráfico para la base de datos
```bash
$ npx prisma studio
```



## Cargar usuarios
> Carga 4 usuarios
```bash
$ npm run seed
```
> Carga 300 usuarios
```bash
$ npm run factory
```


## Archivo .env

DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_bd"

## Installation

```bash
$ npm install
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

## Test

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

Nest is [MIT licensed](LICENSE).
=======
# LoginNestJs
>>>>>>> 5b05cb1c0ab2f6ee4580b5e5e947c1aace95d165



**AuthController:**
- POST /auth/register: Registro de usuario.
- POST /auth/login: Inicio de sesión.
- GET /auth/user: Obtener información del usuario autenticado.

**UsersController:**
- POST /users: Crear un nuevo usuario.
- GET /users: Obtener todos los usuarios.
- GET /users/:id: Obtener información de un usuario específico.
- PATCH /users/:id: Actualizar información de un usuario.
- DELETE /users/:id: Eliminar un usuario.

**CompanyController:**
- GET /company/:companyId/users: Obtener usuarios asociados a una empresa específica.

**HolidaysController:**
- GET /holidays/provinces: Obtener lista de provincias con festivos.
- GET /holidays/:province/localities: Obtener localidades con festivos en una provincia específica.
- GET /holidays/days: Obtener días festivos.

**HolidaysCompanyController:**
- POST /holidays-company/add-days: Definir días festivos para una empresa.
- GET /holidays-company/get-days: Obtener días festivos de una empresa.

**CheckinsController:**
- POST /checkins/:userId/start-workday: Comenzar el día laboral para un usuario.
- POST /checkins/:userId/end-workday: Finalizar el día laboral para un usuario.
- POST /checkins/:userId/pause-workday: Pausar el día laboral para un usuario.
- POST /checkins/:userId/restart-workday: Reanudar el día laboral para un usuario.
- POST /checkins/:userId/recover-checkin: Recuperar registro de entrada para un usuario.



