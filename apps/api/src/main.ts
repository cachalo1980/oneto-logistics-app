import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeedService);
  await seeder.run();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
