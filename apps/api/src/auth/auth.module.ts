// Archivo: apps/api/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // <-- Importar para usar UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy'; // <-- Crearemos este archivo ahora

@Module({
  imports: [
    UsersModule, // Hacemos disponible UsersService para inyección
    PassportModule,
    ConfigModule, // Asegurarnos de que ConfigService está disponible
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }, // El token expira en 24 horas
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy], // <-- Registramos la estrategia
})
export class AuthModule {}
