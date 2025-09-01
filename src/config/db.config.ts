import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

enum ENVIRONMENT {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'automated_tests',
}

const baseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
};

export function createDatasourceOptions(): DataSourceOptions {
  const dbConfig = {
    [ENVIRONMENT.PRODUCTION]: {
      ...baseOptions,
      synchronize: false,
    },
    [ENVIRONMENT.DEVELOPMENT]: {
      ...baseOptions,
      synchronize: true,
    },
    [ENVIRONMENT.AUTOMATED_TEST]: {
      type: 'better-sqlite3',
      database: `./data/database/tests.${Math.random()}.db`,
      synchronize: true,
      dropSchema: false,
      namingStrategy: new SnakeNamingStrategy(),
    },
  };

  const config = dbConfig[process.env.NODE_ENV];

  if (!config) {
    throw new Error('Invalid environment');
  }

  return {
    ...config,
    migrations: [join(__dirname, '../migrations/*.{js,ts}')],
    entities: [join(__dirname, '..', '**/*/repository/*.entity.{js,ts}')],
  };
}

export const datasourceOptions = (() => {
  const baseConfig: Partial<DataSourceOptions> = {
    entities: [join(__dirname, '../**/*.entity.{js,ts}')],
    migrations: [join(__dirname, '../migrations/*.js')],
  };

  return {
    ...baseConfig,
    ...createDatasourceOptions(),
  };
})() as DataSourceOptions;

export default new DataSource(datasourceOptions);
