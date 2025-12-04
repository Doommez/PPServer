import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiPropertyOptional({
    name: 'body',
    description: 'комментарий',
  })
  @IsString()
  body: string
  @ApiPropertyOptional({
    name: 'postId',
    description: 'к какому посту он относится',
  })
  postId: number

  @ApiPropertyOptional({
    name: 'authorId',
    description: 'User hwo create a comment',
  })
  authorId: number
}
