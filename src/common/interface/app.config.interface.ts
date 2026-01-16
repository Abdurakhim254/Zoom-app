export interface AppConfigOptions {
  port: number;
  doc_password: string;
  db_url: string;
  host: string;
  NODE_ENV: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_TIME: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_TIME: string;
}