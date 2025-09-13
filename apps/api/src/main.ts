// Archivo: apps/api/src/main.ts
// VERSIÓN CORREGIDA

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { Logger } from '@nestjs/common'; // Importar Logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usaremos el logger integrado de NestJS para un formato consistente
  const logger = new Logger('Bootstrap');

  // Obtenemos una instancia del SeedService para poblar la DB si es necesario
  const seeder = app.get(SeedService);
  await seeder.run();

  const port = 3001;
  await app.listen(port, '0.0.0.0');

  // --- CORRECCIÓN ---
  // Usamos la variable 'logger' que declaramos arriba.
  logger.log(`🚀 Aplicación corriendo en http://localhost:${port}`);
}
bootstrap();
