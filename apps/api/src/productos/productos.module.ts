// Archivo: apps/api/src/productos/productos.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // <-- Registra la entidad Producto
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
