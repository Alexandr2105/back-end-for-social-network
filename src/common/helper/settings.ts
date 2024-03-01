import { config } from 'dotenv';
import * as process from 'process';
config();

export const settings = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || '1234',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '12345',
  TOKEN_LIFE: 1800,
  REFRESH_TOKEN_LIFE: '3 days',
  CURRENT_APP_BASE_URL: process.env.BASE_URL_AWS || 'https://localhost:3000',
  ACCESS_KEY: process.env.ACCESS_KEY_ID,
  SECRET_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.S3_REGION,
  URL_AWS: process.env.BASE_URL_AWS,
  BUCKET: process.env.BUCKET_NAME,
};
