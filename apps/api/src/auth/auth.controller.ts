// Archivo: apps/api/src/auth/auth.controller.ts
// VERSIÓN CORREGIDA

import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common'; // <-- ¡CORREGIDO! 'Get' añadido aquí.
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // --- NUEVO ENDPOINT DE PRUEBA ---
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Gracias a JwtStrategy, `req.user` contiene ahora los datos del usuario
    // extraídos del token, sin el hash de la contraseña.
    return req.user;
  }
}
