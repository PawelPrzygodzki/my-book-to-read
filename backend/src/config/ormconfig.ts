import { DataSourceOptions } from 'typeorm';

import config from './config';

export default {
  url: config.db.url,
  name: 'default',
  type: 'postgres',
  ssl: config.db.ssl === true ? { require: true } : undefined,
  logging: 'all', // TODO add config
  cli: { migrationsDir: './src/db/migrations' },
  migrations: ['./dist/db/migrations/*.js'],
  entities:
    // Note: We're using ts-jest for tests, so entities should be loaded as typescript files
    process.env.NODE_ENV === 'test' && process.env.IS_TEST === 'true'
      ? ['./src/**/*.entity.ts']
      : ['./dist/**/*.entity.js'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  synchronize: false,
  extra: {
    // based on  https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.MAX_DB_CONNECTIONS
      ? Number(process.env.MAX_DB_CONNECTIONS)
      : 8,
    // connection timeout
    connectionTimeoutMillis: 2000,
  },
} as DataSourceOptions;
