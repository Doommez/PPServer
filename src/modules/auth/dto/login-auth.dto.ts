import { RegisterAuthDto } from './register-auth.dto'
import { IntersectionType, PickType } from '@nestjs/swagger'

export class LoginAuthDto extends IntersectionType(
  PickType(RegisterAuthDto, ['login', 'password'] as const),
  class {},
) {}
