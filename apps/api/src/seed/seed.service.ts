// Archivo: apps/api/src/seed/seed.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run() {
    this.logger.log('Iniciando proceso de seeding...');
    await this.createAdminUser();
    this.logger.log('Seeding completado.');
  }

  private async createAdminUser() {
    const adminEmail = 'admin@oneto.com';
    const adminExists = await this.userRepository.findOneBy({
      email: adminEmail,
    });

    if (adminExists) {
      this.logger.log('Usuario administrador ya existe. Omitiendo creación.');
      return;
    }

    this.logger.log('Creando usuario administrador...');
    const password = 'admin'; // Contraseña simple para desarrollo
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = this.userRepository.create({
      nombre: 'Administrador Oneto',
      email: adminEmail,
      passwordHash: hashedPassword,
      rol: UserRole.ADMIN_ONETO,
      activo: true,
    });

    await this.userRepository.save(adminUser);
    this.logger.log(
      `Usuario administrador creado. Email: ${adminEmail}, Contraseña: ${password}`,
    );
  }
}
