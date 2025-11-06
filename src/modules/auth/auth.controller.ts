import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginAuthDto } from './dto/login-auth.dto'
import { Response } from 'express'
import { IsPublic } from '../../decorators/SkipAuth.decorator'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return await this.authService.registration(registerDto)
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @IsPublic()
  @Post('login')
  async login(
    @Body() loginDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(loginDto)
    res.cookie('access_token', tokens.token, {
      httpOnly: true, // нельзя прочитать из JS
      secure: true, // только по HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15 минут
    })

    // Можно вернуть refreshToken в теле или тоже в cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
    })

    return tokens
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // Удаляем cookie, установив её с истёкшим сроком
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0), // делает cookie просроченной
      path: '/',
    })

    return res.send({ message: 'Logged out successfully' })
  }
}
