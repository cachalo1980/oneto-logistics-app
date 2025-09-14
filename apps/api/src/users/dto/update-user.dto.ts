// Archivo: apps/api/src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // Necesitarás este paquete
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
