import 'reflect-metadata';

import { DataSource } from 'typeorm';
import Section from './entity/Section';
import Content from './entity/Content';
import Link from './entity/Link';
import logger from '../utils/logger';

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'db',
  synchronize: true,
  logging: false,
  entities: [Section, Content, Link]
});

export const initDataSource = async () => {
  try {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
    return appDataSource;
  } catch (err) {
    logger.error({ error: err.message }, 'Error during data source initialization.');
    return undefined;
  }
};

export default appDataSource;
