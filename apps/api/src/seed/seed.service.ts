// Archivo: apps/api/src/seed/seed.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, UserRole } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  // Inyectamos el DataSource para poder ejecutar consultas SQL crudas
  // y los repositorios necesarios para crear las nuevas entidades.
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  /**
   * Punto de entrada principal del proceso de seeding.
   */
  async run() {
    this.logger.log('Iniciando proceso de seeding...');

    await this.cleanDatabase();

    const clientePrueba = await this.createTestCliente();
    await this.createTestProductos(clientePrueba);
    await this.createAdminUser();
    await this.createClientUser(clientePrueba);

    this.logger.log('Seeding completado con éxito.');
  }

  /**
   * Borra todos los datos de las tablas usando TRUNCATE ... CASCADE
   * para manejar las restricciones de claves foráneas automáticamente.
   */
  private async cleanDatabase() {
    this.logger.warn('Limpiando la base de datos con TRUNCATE CASCADE...');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    // Lista de todas las tablas que hemos creado.
    // El orden aquí no importa gracias a CASCADE.
    const tableNames = [
      'cliente',
      'producto',
      'usuario',
      'solicitud',
      'detalle_solicitud',
    ]
      .map((name) => `"${name}"`)
      .join(', ');

    try {
      // Ejecutamos una única consulta TRUNCATE que se encarga de todo.
      // RESTART IDENTITY resetea los contadores de ID (ej. 1, 2, 3...).
      await queryRunner.query(
        `TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`,
      );
      this.logger.log('Base de datos limpiada.');
    } catch (error) {
      this.logger.error('Error al limpiar la base de datos', error.stack);
      throw error; // Relanzamos el error para detener el proceso si la limpieza falla.
    } finally {
      // Es crucial liberar el queryRunner para devolver la conexión al pool.
      await queryRunner.release();
    }
  }

  /**
   * Crea un cliente de prueba si no existe.
   */
  private async createTestCliente(): Promise<Cliente> {
    const cuitPrueba = '30-12345678-9';
    const clienteExistente = await this.clienteRepository.findOneBy({
      cuit: cuitPrueba,
    });

    if (clienteExistente) {
      this.logger.log('Cliente de prueba ya existe.');
      return clienteExistente;
    }

    this.logger.log('Creando cliente de prueba...');
    const nuevoCliente = this.clienteRepository.create({
      razonSocial: 'Cliente de Prueba S.A.',
      cuit: cuitPrueba,
    });
    return this.clienteRepository.save(nuevoCliente);
  }

  /**
   * Crea productos de prueba para un cliente específico.
   */
  private async createTestProductos(cliente: Cliente) {
    this.logger.log(
      `Creando productos de prueba para el cliente #${cliente.id}...`,
    );
    const productosData = [
      { descripcion: 'Cajas de Pollo Congelado', clienteId: cliente.id },
      { descripcion: 'Pallets de Papas Fritas', clienteId: cliente.id },
      { descripcion: 'Bultos de Verduras Mixtas', clienteId: cliente.id },
    ];
    const productoEntities = this.productoRepository.create(productosData);
    await this.productoRepository.save(productoEntities);
    this.logger.log('Productos de prueba creados.');
  }

  /**
   * Crea el usuario administrador global.
   */
  private async createAdminUser() {
    this.logger.log('Creando usuario administrador...');
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = this.userRepository.create({
      nombre: 'Administrador Oneto',
      email: 'admin@oneto.com',
      passwordHash: hashedPassword,
      rol: UserRole.ADMIN_ONETO,
      activo: true,
      clienteId: null,
    });

    await this.userRepository.save(adminUser);
    this.logger.log(
      `-> Usuario Administrador creado: admin@oneto.com / ${password}`,
    );
  }

  /**
   * Crea un usuario de tipo CLIENTE para un cliente específico.
   */
  private async createClientUser(cliente: Cliente) {
    this.logger.log('Creando usuario de cliente de prueba...');
    const password = 'cliente';
    const hashedPassword = await bcrypt.hash(password, 10);
    const clientUser = this.userRepository.create({
      nombre: 'Usuario de Prueba',
      email: 'cliente@prueba.com',
      passwordHash: hashedPassword,
      rol: UserRole.CLIENTE,
      activo: true,
      clienteId: cliente.id,
    });
    await this.userRepository.save(clientUser);
    this.logger.log(
      `-> Usuario Cliente creado: cliente@prueba.com / ${password}`,
    );
  }
}
