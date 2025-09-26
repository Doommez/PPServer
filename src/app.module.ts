import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { AuthGuard } from './guards/AuthGuard/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? `.env`
          : `.env.${process.env.NODE_ENV}.local`,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
