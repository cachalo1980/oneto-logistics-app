// Archivo: apps/api/src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

// El payload es la información que decodificamos del token
interface JwtPayload {
  sub: number;
  email: string;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService, // Opcional, pero buena práctica
  ) {
    super({
      // Define cómo extraer el token de la petición
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No queremos que passport-jwt lance un error si el token ha expirado.
      // Nosotros lo manejaremos.
      ignoreExpiration: false,
      // El secreto para verificar la firma del token
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Este método se ejecuta automáticamente después de que passport-jwt
   * valida la firma y la expiración del token.
   * Su propósito es tomar el payload decodificado y devolver el usuario
   * que se adjuntará al objeto `Request`.
   * @param payload El contenido del JWT, ya verificado.
   */
  async validate(payload: JwtPayload) {
    // En este punto, el token ya es válido.
    // Opcionalmente, podemos hacer una comprobación extra contra la base de datos
    // para asegurarnos de que el usuario todavía existe y está activo.
    const user = await this.usersService.findOne(payload.sub); // 'sub' es el ID del usuario

    if (!user || !user.activo) {
      throw new UnauthorizedException('Token inválido o usuario inactivo.');
    }

    // Devolvemos un objeto de usuario simplificado (sin el hash de la contraseña)
    // que estará disponible en `req.user` en nuestros controladores.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;
    return result;
  }
}
