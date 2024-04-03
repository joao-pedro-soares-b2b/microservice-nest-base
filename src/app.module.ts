import { CreateExampleUseCase } from '@domain/use-cases/createExample.use-case';
import { FindExampleByIdUseCase } from '@domain/use-cases/findExampleById.use-case';
import { ExampleAdapter } from '@infrastructure/adapters/example.adapter';
import { PrismaDatabase } from '@infrastructure/database/prisma.database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configuration from 'src/config/config';
import { AppController } from './representation/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    // Database
    PrismaDatabase,

    // Use Cases
    CreateExampleUseCase,
    FindExampleByIdUseCase,

    // Adapters
    {
      provide: 'ExampleAdapter',
      useClass: ExampleAdapter,
    },
  ],
})
export class AppModule {}
