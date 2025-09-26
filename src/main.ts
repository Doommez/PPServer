import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'node:process'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('PPSERVER')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .setContact('Evgenii', '', 'jenyaz862@gmail.com')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.APP_PORT, () => {
    console.log(`app start on ${process.env.APP_PORT}`)
  })
}

bootstrap()
