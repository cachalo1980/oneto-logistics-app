// Archivo: apps/api/src/users/users.service.ts
// VERSIÓN LIMPIA Y FINAL

import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto'; // <-- Eliminamos importación no usada
// import { UpdateUserDto } from './dto/update-user.dto'; // <-- Eliminamos importación no usada
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Dejamos los métodos CRUD como plantillas, pero sin los DTOs por ahora
  // para mantener el código limpio.
  create(/* createUserDto: CreateUserDto */) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number /*, updateUserDto: UpdateUserDto */) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.passwordHash')
      .getOne();
  }
}
