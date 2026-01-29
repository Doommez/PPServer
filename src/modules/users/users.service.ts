import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    })

    if (existUser) {
      throw new HttpException(
        'Пользователь с таким логином существует',
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.prisma.user.create({ data: createUserDto })
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        roles: true,
      },
    })
  }

  async getUserByLogin(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    })
  }

  async getAllRoles() {
    return this.prisma.role.findMany()
  }

  async createRole(role: string) {
    return this.prisma.role.create({
      data: {
        name: role,
      },
    })
  }
}
