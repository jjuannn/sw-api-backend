import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ENVIRONMENT, environmentVariablesConfig } from './env.config';

dotenv.config();

export function createDatasourceOptions(
  configService: ConfigService,
): DataSourceOptions {
  const environment = configService.get<ENVIRONMENT>('app.nodeEnv')!;

  const baseOptions: Partial<DataSourceOptions> = {
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    schema: configService.get<string>('database.schema'),
    namingStrategy: new SnakeNamingStrategy(),
  };

  const dbConfig = {
    [ENVIRONMENT.PRODUCTION]: {
      ...baseOptions,
      synchronize: false,
      ssl: true,
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
  } as Record<ENVIRONMENT, DataSourceOptions>;

  const config = dbConfig[environment];

  if (!config) {
    throw new Error('Invalid environment');
  }

  return {
    ...config,
    migrations: [join(__dirname, '../migrations/*.{js,ts}')],
    entities: [join(__dirname, '..', '**/*/repository/*.entity.{js,ts}')],
  };
}

const createConfigService = (): ConfigService => {
  const config = environmentVariablesConfig();
  const configService = new ConfigService(config);
  return configService;
};

export const datasourceOptions = (() => {
  const configService = createConfigService();
  const baseConfig: Partial<DataSourceOptions> = {
    entities: [join(__dirname, '../**/*.entity.{js,ts}')],
    migrations: [join(__dirname, '../migrations/*.js')],
  };

  return {
    ...baseConfig,
    ...createDatasourceOptions(configService),
  };
})() as DataSourceOptions;

export default new DataSource(datasourceOptions);
