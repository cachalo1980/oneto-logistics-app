// Archivo: apps/api/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ... (los métodos create, findAll, etc. que generó el CLI)

  // --- NUEVO MÉTODO ---
  async findOneByEmail(email: string): Promise<User | undefined> {
    // Usamos QueryBuilder para seleccionar explícitamente el passwordHash,
    // ya que lo marcamos con `select: false` en la entidad por seguridad.
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.passwordHash') // <-- ¡Muy importante!
      .getOne();
  }
}
