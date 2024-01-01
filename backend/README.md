# My Book To Read Backend

This service is backend site of My Book To Read application

## TODO

- [ ] Add more unit tests
- [ ] Describe response for all endpoints
- [ ] Add swagger documentation for API
- [ ] Make open library service more generic
- [ ] Add transaction for add and remove book to list
- [ ] Create docker file for service

## Development

### Run locally

Install dependencies
```
npm install
```

Copy env file from example to .env

```
cp example.env .env
```

Change DATABASE_URL to correct value in .env file

Build application

```
npm run build
```

Run migrations

```
 npm run migrations:run

```

Run application locally

```
npm run start:dev
```

### Tests

#### Unit test 

```
npm run test
```

### Migrations

#### Generate migration

Typeorm will generate new migration base on differance between your current database structure and Entity definitions

```
npm run migrations:generate -- src/db/migrations/<your-migration-name>
```

#### Create migration

Typeorm will create new migration file

```
npm run migrations:create -- src/db/migrations/<your-migration-name>
```

#### Run migration

Typeorm will run all migration on database

```
npm run migrations:run
```

#### Revert migration

Typeorm will execute down in the latest executed migration

```
npm run migrations:revert
```
