import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(express.static(join(__dirname, '../public')));

  const options = new DocumentBuilder()
    .setTitle('Irrigation System')
    .setDescription('Irrigation System API description')
    .setVersion('1.0')
    .addTag('irrigation')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
