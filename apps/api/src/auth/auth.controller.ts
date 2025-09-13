// Archivo: apps/api/src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local')) // <-- Activa nuestra LocalStrategy
  @Post('login')
  async login(@Request() req) {
    // Si llegamos aquí, la LocalStrategy ya validó al usuario
    // y lo adjuntó al objeto 'req'.
    return this.authService.login(req.user);
  }
}
