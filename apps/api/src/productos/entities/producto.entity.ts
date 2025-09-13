// Archivo: apps/api/src/productos/entities/producto.entity.ts
import { Cliente } from '../../clientes/entities/cliente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'erp_id',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  erpId: string | null;

  @Column({ length: 255 })
  descripcion: string;

  // --- RELACIONES ---
  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
