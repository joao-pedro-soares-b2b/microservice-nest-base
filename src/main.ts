import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`,
      protoPath: join(__dirname, 'infrastructure/grpc/example.proto'),
      package: 'example',
    },
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.listen().then(() => {
    Logger.log(
      `Microservice is listening on ${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`,
      'NestListener',
    );
  });
}

bootstrap();
