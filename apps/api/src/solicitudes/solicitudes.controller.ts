// Archivo: apps/api/src/solicitudes/solicitudes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity'; // Importamos la entidad User para tipado

@UseGuards(JwtAuthGuard) // <-- ¡PROTEGIDO! Aplicamos el guardián a todo el controlador
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto, @Request() req) {
    const user = req.user as User; // Extraemos el usuario del token
    return this.solicitudesService.create(createSolicitudDto, user);
  }

  @Get()
  findAll(@Request() req) {
    const user = req.user as User; // Extraemos el usuario del token
    return this.solicitudesService.findAll(user);
  }

  // ... (dejamos los otros endpoints por ahora)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudesService.findOne(+id);
  }
}
