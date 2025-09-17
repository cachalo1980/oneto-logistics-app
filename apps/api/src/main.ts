// Archivo: apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // --- HABILITAR CORS ---
  app.enableCors({
    origin: 'http://localhost:3000', // Permite peticiones solo desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Ejecución del seeder
  const seeder = app.get(SeedService);
  await seeder.run();

  const port = 3001;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Aplicación corriendo en http://localhost:${port}`);
}
bootstrap();
