// Archivo: apps/api/src/clientes/clientes.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], // <-- Registra la entidad Cliente
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
