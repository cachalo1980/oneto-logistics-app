// Archivo: apps/api/src/solicitudes/entities/solicitud.entity.ts

import { Cliente } from '../../clientes/entities/cliente.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DetalleSolicitud } from './detalle-solicitud.entity'; // Importa desde el nuevo archivo

// --- Enums de la Solicitud ---

export enum TipoSolicitud {
  INGRESO = 'INGRESO',
  RETIRO = 'RETIRO',
}
export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

// --- Entidad Principal: Solicitud ---

@Entity('solicitud')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoSolicitud,
  })
  tipo: TipoSolicitud;

  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.PENDIENTE,
  })
  estado: EstadoSolicitud;

  @Column({
    name: 'fecha_programada',
    type: 'date',
  })
  fechaProgramada: string;

  @Column({
    name: 'hora_aproximada',
    type: 'time',
    nullable: true,
  })
  horaAproximada: string | null;

  @Column({
    name: 'patente_vehiculo',
    length: 20,
    nullable: true,
  })
  patenteVehiculo: string | null;

  @Column({
    name: 'datos_conductor',
    type: 'text',
    nullable: true,
  })
  datosConductor: string | null;

  @Column({
    name: 'motivo_rechazo',
    type: 'text',
    nullable: true,
  })
  motivoRechazo: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  // --- Columnas de Relaciones y Claves Foráneas ---

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ name: 'aprobado_por', nullable: true })
  aprobadoPorId: number | null;

  // --- Definiciones de Relaciones ---

  @ManyToOne(() => Cliente, (cliente) => cliente.solicitudes)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuarioCreador: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'aprobado_por' })
  usuarioAprobador: User;

  @OneToMany(() => DetalleSolicitud, (detalle) => detalle.solicitud, {
    cascade: true,
  })
  detalles: DetalleSolicitud[];
}
