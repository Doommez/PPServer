import { IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ name: 'login', description: 'Login user', example: 'Evgenii' })
  @IsString()
  login: string

  @ApiProperty({ name: 'password', description: 'Password', example: '123456' })
  @IsString()
  password: string

  @ApiPropertyOptional({
    name: 'name',
    description: 'name user',
    example: 'Evgenii',
    required: false,
  })
  @IsString()
  name?: string
}
