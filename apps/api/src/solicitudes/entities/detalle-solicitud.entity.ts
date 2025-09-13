// Archivo: apps/api/src/solicitudes/entities/detalle-solicitud.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Solicitud } from './solicitud.entity'; // <-- Importa la entidad principal
import { Producto } from '../../productos/entities/producto.entity'; // <-- Importa Producto

@Entity('detalle_solicitud')
export class DetalleSolicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'solicitud_id' })
  solicitudId: number;

  @ManyToOne(() => Solicitud, (solicitud) => solicitud.detalles)
  @JoinColumn({ name: 'solicitud_id' })
  solicitud: Solicitud;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ name: 'unidad_medida', length: 50 })
  unidadMedida: string;
}
