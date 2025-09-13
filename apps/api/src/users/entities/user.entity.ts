// Archivo: apps/api/src/users/entities/user.entity.ts
import { Cliente } from '../../clientes/entities/cliente.entity'; // <-- Importar
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne, // <-- Importar
  JoinColumn, // <-- Importar
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  CLIENTE = 'CLIENTE',
  ADMIN_ONETO = 'ADMIN_ONETO',
}

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // ... (nombre, email, passwordHash, rol, activo se mantienen igual)
  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE })
  rol: UserRole;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // --- RELACIONES ---
  @Column({ name: 'cliente_id', nullable: true }) // Columna para la clave foránea
  clienteId: number | null;

  @ManyToOne(() => Cliente, (cliente) => cliente.usuarios, { nullable: true })
  @JoinColumn({ name: 'cliente_id' }) // Especifica que la columna 'cliente_id' es la clave foránea
  cliente: Cliente;
}
