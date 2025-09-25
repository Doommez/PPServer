import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Создание пользователя',
  })
  @Post('create')
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto)
  }

  @ApiOperation({
    summary: 'Создать роли',
  })
  @Post('create/role')
  async createRole(@Query('role') createRoleDto: string) {
    return this.usersService.createRole(createRoleDto)
  }

  @ApiOperation({
    summary: 'Получить все роли',
  })
  @Get('all/roles')
  async getAllRoles() {
    return this.usersService.getAllRoles()
  }

  @ApiOperation({
    summary: 'Получить всех пользователей',
  })
  @Get('all')
  async getAll() {
    return this.usersService.getAllUsers()
  }
}
