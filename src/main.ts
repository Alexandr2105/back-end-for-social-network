import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApp } from './common/helper/create.app';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const rawApp = await NestFactory.create(AppModule, { rawBody: true });
  const app = createApp(rawApp);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000, () => {
    console.log(`App started at 3000 port`);
  });
}
bootstrap();
