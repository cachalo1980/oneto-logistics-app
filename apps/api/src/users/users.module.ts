// Archivo: apps/api/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Importa esto
import { User } from './entities/user.entity'; // <-- Importa tu entidad

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- Añade esta línea
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
