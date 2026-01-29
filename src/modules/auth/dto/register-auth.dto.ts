import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class RegisterAuthDto {
  @ApiProperty({
    example: 'userLogin',
    description: 'Логин пользователя',
  })
  @IsString()
  username: string

  @ApiProperty({
    example: 'Evgenii',
    description: 'Имя пользователя',
    required: false,
  })
  @IsString()
  name?: string

  @ApiProperty({
    example: '123412345',
    description: 'pass',
  })
  @IsString()
  password: string

  @ApiProperty({
    example: [1, 2],
    description: 'Перечень ID ролей',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true }) // проверка, что каждый элемент — число
  @Type(() => Number) // преобразует строки из JSON в числа
  roles: number[]
}
