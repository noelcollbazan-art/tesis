import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir archivos estáticos desde la carpeta uploads
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Puerto de Vite
    credentials: true,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}

void bootstrap();
