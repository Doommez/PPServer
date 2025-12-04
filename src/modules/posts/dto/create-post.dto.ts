import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePost {
  @ApiProperty({
    name: 'title',
    description: 'Наименование поста',
  })
  @IsString()
  title?: string

  @ApiProperty({
    name: 'author',
    description: 'авторы',
  })
  @IsString()
  author?: string
}
