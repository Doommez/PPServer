import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC } from '../../decorators/SkipAuth.decorator'
import { User } from '@prisma/client'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const access_token = request.cookies['access_token']
    // const refresh_token = request.cookies['refresh_token']
    try {
      if (!access_token) {
        throw new UnauthorizedException({
          message: 'нет токена',
          status: HttpStatus.UNAUTHORIZED,
        })
      }
      request.user = this.jwtService.verify(access_token)
      return true
    } catch (e) {
      throw new UnauthorizedException(
        e.response || {
          message: 'Ошибка авторизации',
          status: HttpStatus.UNAUTHORIZED,
        },
      )
    }
  }
}
