// Archivo: apps/api/src/solicitudes/solicitudes.module.ts
// VERSIÓN CORREGIDA

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { Solicitud } from './entities/solicitud.entity'; // <-- Importa Solicitud desde su archivo
import { DetalleSolicitud } from './entities/detalle-solicitud.entity'; // <-- ¡CORRECCIÓN! Importa DetalleSolicitud desde SU PROPIO archivo

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud, DetalleSolicitud])], // <-- El registro sigue siendo el mismo
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
})
export class SolicitudesModule {}
