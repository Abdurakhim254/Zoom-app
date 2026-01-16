import { registerAs } from '@nestjs/config';
import { AppConfigOptions } from 'src/common/interface';



export const appConfig = registerAs<AppConfigOptions>(
  'app',
  (): AppConfigOptions => ({
    port: +process.env.APP_PORT,
    host: process.env.APP_HOST,
    doc_password: process.env.DOC_PASSWORD,
    db_url: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME,
  }),
);
