// Archivo: apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Cargar las variables de entorno de nuestro archivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigService esté disponible en toda la app
      envFilePath: '.env',
    }),

    // 2. Configurar la conexión a la base de datos usando TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importamos ConfigModule para poder usar ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        // ¡IMPORTANTE! autoLoadEntities y synchronize solo para desarrollo
        autoLoadEntities: true, // TypeORM cargará automáticamente las entidades que definamos
        synchronize: true, // TypeORM creará/actualizará las tablas de la DB automáticamente.
        // Esto es perfecto para desarrollo, pero DEBE ser 'false' en producción.
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
