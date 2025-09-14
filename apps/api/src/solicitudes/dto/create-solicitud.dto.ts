// Archivo: apps/api/src/solicitudes/dto/create-solicitud.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TipoSolicitud } from '../entities/solicitud.entity';
import { CreateDetalleSolicitudDto } from './create-detalle-solicitud.dto';

export class CreateSolicitudDto {
  @IsEnum(TipoSolicitud)
  tipo: TipoSolicitud;

  @IsDateString()
  fechaProgramada: string;

  @IsString()
  @IsOptional()
  horaAproximada?: string;

  @IsString()
  @IsOptional()
  patenteVehiculo?: string;

  @IsString()
  @IsOptional()
  datosConductor?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleSolicitudDto)
  detalles: CreateDetalleSolicitudDto[];
}
