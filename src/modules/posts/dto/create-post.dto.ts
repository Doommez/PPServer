import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePost {
  @ApiProperty({
    name: 'title',
    description: 'Title of the post',
  })
  @IsString()
  title?: string

  @IsString()
  autchor?: string
}
