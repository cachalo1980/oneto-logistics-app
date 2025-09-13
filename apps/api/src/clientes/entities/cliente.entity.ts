import { Solicitud } from '../../solicitudes/entities/solicitud.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cliente')
export class Cliente {
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

  @Column({ name: 'razon_social', length: 255 })
  razonSocial: string;

  @Column({ length: 13, unique: true })
  cuit: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // --- RELACIONES ---
  @OneToMany(() => User, (user) => user.cliente)
  usuarios: User[];

  @OneToMany(() => Solicitud, (solicitud) => solicitud.cliente)
  solicitudes: Solicitud[];
}
