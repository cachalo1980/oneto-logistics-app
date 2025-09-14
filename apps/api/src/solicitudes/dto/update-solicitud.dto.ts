import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDto } from './create-solicitud.dto';

export class UpdateSolicitudeDto extends PartialType(CreateSolicitudDto) {}
