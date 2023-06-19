import { Options, ReflectMetadataProvider, Utils } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Ogma } from '@ogma/logger';
import { CamelCaseNamingStrategy } from '@vendit-dev/db';

import configuration from './src/environments/configuration';

const isDev = configuration().appEnv === 'dev';
const logger = new Ogma({
  logLevel: isDev ? 'ALL' : 'INFO',
  context: 'USER_DB',
});
const config: Options = {
  type: 'mariadb',
  namingStrategy: CamelCaseNamingStrategy,
  host: 'localhost',
  port: 3306,
  user: 'USER_NAME',
  password: '',
  dbName: 'DB_NAME',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  logger: logger.log.bind(logger),
  debug: true,
  highlighter: new SqlHighlighter(),
  baseDir: __dirname,
  metadataProvider: ReflectMetadataProvider,
  pool: {
    min: 1,
    max: 20,
  },
};

export default config;
