import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApp } from './common/helper/create.app';
import { useContainer } from 'class-validator';
import { settings } from './common/helper/settings';

async function bootstrap() {
  const rawApp = await NestFactory.create(AppModule, { rawBody: true });
  const app = createApp(rawApp);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(settings.PORT, () => {
    console.log(`App started at ${settings.PORT} port`);
  });
}

bootstrap();
