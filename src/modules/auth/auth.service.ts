import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import { LoginAuthDto } from './dto/login-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(registerDto: RegisterAuthDto) {
    const candidate = await this.userService.getUserByLogin(registerDto.username)
    if (candidate) {
      throw new BadRequestException({
        message: 'Пользователь с таким логином уже существует!',
        code: HttpStatus.BAD_REQUEST,
      })
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, roles, ...dto } = registerDto

    const user = await this.userService.create({
      hash: hashedPassword,
      ...dto,
      roles: {
        connect: roles.map((id) => ({
          id,
        })),
      },
    })

    return await this.generatePairTokens(user)
  }

  async login(authDto: LoginAuthDto) {
    const user = await this.validateUser(authDto)
    return this.generatePairTokens(user)
  }

  async generatePairTokens(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...userTokenPayload } = user
    const payloadToken = { ...userTokenPayload }
    return {
      token: this.jwtService.sign(payloadToken),
      refreshToken: this.jwtService.sign(payloadToken, {
        expiresIn: '1m',
      }),
    }
  }

  async validateUser(registerDto: { username: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: registerDto.username,
      },
    })

    if (!user) {
      throw new BadRequestException({
        message: 'Пользователь с таким логином не существует!',
        code: HttpStatus.BAD_REQUEST,
      })
    }

    const comparePass = await bcrypt.compare(registerDto.password, user.hash)
    if (!comparePass) {
      throw new BadRequestException({
        message: 'Не верный пароль',
        code: HttpStatus.BAD_REQUEST,
      })
    }
    return user
  }
}
