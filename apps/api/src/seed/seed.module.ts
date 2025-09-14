// Archivo: apps/api/src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Producto } from '../productos/entities/producto.entity';
// import {
// (Solicitud,
//  DetalleSolicitud,
// } from '../solicitudes/entities/solicitud.entity';

@Module({
  imports: [
    ConfigModule,
    // Importamos todas las entidades que el SeedService necesita manipular
    TypeOrmModule.forFeature([User, Cliente, Producto]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
