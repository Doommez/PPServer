import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT, ()=>{
    console.log(`app start on ${process.env.APP_PORT}`)
  });
}
bootstrap();
