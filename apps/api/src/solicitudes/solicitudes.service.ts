// Archivo: apps/api/src/solicitudes/solicitudes.service.ts
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UserRole } from '../users/entities/user.entity';
import { Solicitud } from './entities/solicitud.entity';
import { DetalleSolicitud } from './entities/detalle-solicitud.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}

  async create(
    createSolicitudDto: CreateSolicitudDto,
    user: User,
  ): Promise<Solicitud> {
    // Regla de negocio: Solo los usuarios de rol CLIENTE pueden crear solicitudes.
    if (user.rol !== UserRole.CLIENTE || !user.clienteId) {
      throw new UnauthorizedException(
        'Solo los usuarios de cliente pueden crear solicitudes.',
      );
    }

    // Creamos la instancia de la solicitud principal
    const nuevaSolicitud = this.solicitudRepository.create({
      ...createSolicitudDto,
      clienteId: user.clienteId,
      usuarioId: user.id,
      // Mapeamos los detalles del DTO a entidades DetalleSolicitud
      detalles: createSolicitudDto.detalles.map((detalleDto) => {
        const detalle = new DetalleSolicitud();
        detalle.productoId = detalleDto.productoId;
        detalle.cantidad = detalleDto.cantidad;
        detalle.unidadMedida = detalleDto.unidadMedida;
        return detalle;
      }),
    });

    // Guardamos. Gracias a `cascade: true` en la entidad, TypeORM guardará
    // la solicitud y todos sus detalles en una sola operación.
    return this.solicitudRepository.save(nuevaSolicitud);
  }

  async findAll(user: User): Promise<Solicitud[]> {
    const queryOptions = {
      relations: ['cliente', 'detalles', 'detalles.producto', 'usuarioCreador'],
    };

    if (user.rol === UserRole.ADMIN_ONETO) {
      // El admin puede ver todas las solicitudes.
      return this.solicitudRepository.find(queryOptions);
    }

    if (user.rol === UserRole.CLIENTE) {
      // El cliente solo puede ver las solicitudes de su empresa.
      return this.solicitudRepository.find({
        ...queryOptions,
        where: { clienteId: user.clienteId },
      });
    }

    // Si por alguna razón el usuario no tiene un rol válido, no devolvemos nada.
    return [];
  }

  async findOne(id: number): Promise<Solicitud> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id },
      relations: ['cliente', 'detalles', 'detalles.producto', 'usuarioCreador'],
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID #${id} no encontrada.`);
    }

    return solicitud;
  }
}
