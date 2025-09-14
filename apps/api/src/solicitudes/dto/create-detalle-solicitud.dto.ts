// Archivo: apps/api/src/solicitudes/dto/create-detalle-solicitud.dto.ts
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDetalleSolicitudDto {
  @IsInt()
  @IsNotEmpty()
  productoId: number;

  @IsNumber()
  @Min(0.01)
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  unidadMedida: string;
}
