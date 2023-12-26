import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApp } from './common/helper/create.app';
import { useContainer } from 'class-validator';
import { settings } from './common/helper/settings';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const rawApp = await NestFactory.create(AppModule, { rawBody: true });
  const app = createApp(rawApp);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Social Network')
    .setDescription('The social network API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(settings.PORT, () => {
    console.log(`App started at ${settings.PORT} port`);
  });
}

bootstrap();
