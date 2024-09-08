import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/users/users.service';
import { AuthenticatedRequest } from '../../interfaces/request.interface';
import { IS_SECURED_IDENTIFIER } from './auth.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSecured = this.reflector.getAllAndOverride<boolean>(
      IS_SECURED_IDENTIFIER,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const token = this.extractTokenFromHeader(request as any);
    if (!token && isSecured) {
      throw new UnauthorizedException('action_not_allowed');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      const user = await this.userService.findOne(payload.sub);
      if (user === null) {
        throw new UnauthorizedException('action_not_allowed');
      }
      request.user = user;
    } catch {
      if (isSecured) throw new UnauthorizedException('action_not_allowed');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
