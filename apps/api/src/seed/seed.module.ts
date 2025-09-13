// Archivo: apps/api/src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module'; // Importamos UsersModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity'; // Importamos la entidad User directamente

@Module({
  imports: [ConfigModule, UsersModule, TypeOrmModule.forFeature([User])], // Añadimos los módulos
  providers: [SeedService],
})
export class SeedModule {}
