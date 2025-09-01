export enum ENVIRONMENT {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'automated_tests',
}

export const environmentVariablesConfig = () => ({
  app: {
    nodeEnv: process.env.NODE_ENV,
  },
  database: {
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
