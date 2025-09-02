# Star Wars API Backend

- Star Wars API available on https://sw-api-backend-deploy.onrender.com

Note from Render's documentation:

```
Render spins down a Free web service that goes 15 minutes without receiving inbound traffic.
Render spins the service back up whenever it next receives a request to process.

Spinning up a service takes up to a minute, which causes a noticeable delay for incoming requests until
the service is back up and running.
For example, a browser page load will hang temporarily.
```

## Requisites

- Node @18.12.0 or higher.
- Docker.

## Installation

- Run `npm ci` to install all the dependencies.
- Create a `.env` file on the project root following the format specified on `.env.dist`.

## Environment Variables

| Variable      | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `PORT`        | Nest application port. Defaults to '3000' if not specified                                            |
| `NODE_ENV`    | Current environment. Use 'development' for local                                                      |
| `DB_HOST`     | Postgres database host. Use 'localhost' for local or 'host.docker.internal' if running docker-compose |
| `DB_PORT`     | Postgres database port. Use '5432' for local                                                          |
| `DB_USERNAME` | Postgres database user. Use 'postgres' for local                                                      |
| `DB_PASSWORD` | Postgres database password. Use 'example' for local                                                   |
| `DB_NAME`     | Postgres database name. Use 'sw_api' for local                                                        |
| `JWT_SECRET`  | JWT secret to sign and check tokens. Can be any string or Buffer                                      |

## Run

- `docker compose up` to run the local Postgres database used for development.
- `npm run start:dev` to start Nest application on watch mode.
- `npm run build` to generate a build.
- `npm run start` to start Nest application with the current build.

## Testing

- `npm run test` will run Jest unit and endpoint tests and generate a coverage report.

## Migrations

- Run `npm run migration:generate --name=MIGRATION_NAME` to generate a migration with the latest schema changes.
- Run `npm run migration:run` to run all pending migrations.

## Initial data

- Run `sql/insert_admin_user.sql` to insert an admin user.
- Run `sql/insert_initial_movies.sql` to insert initial movies data.
