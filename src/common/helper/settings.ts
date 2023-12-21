import { config } from 'dotenv';
import * as process from 'process';
config();

export const settings = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || '1234',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '12345',
  TOKEN_LIFE: 1800,
  REFRESH_TOKEN_LIFE: '3 days',
  CURRENT_APP_BASE_URL:
    process.env.CURRENT_APP_BASE_URL || 'https://localhost:3000',
};
