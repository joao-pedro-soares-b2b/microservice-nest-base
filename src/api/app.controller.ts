import { CreateExampleDto, FindExampleByIdDto } from '@api/dtos';
import { ExampleEntity } from '@domain/entities/Example.entity';
import { CreateExampleUseCase } from '@domain/use-cases/createExample.use-case';
import { FindExampleByIdUseCase } from '@domain/use-cases/findExampleById.use-case';
import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Http2gRPCExceptionFilter } from 'src/shared/filter/http2gRPCException.filter';

@Controller()
export class AppController {
  constructor(
    private readonly createExampleUseCase: CreateExampleUseCase,
    private readonly findExampleByIdUseCase: FindExampleByIdUseCase,
  ) {}

  @GrpcMethod('ExampleService', 'Create')
  async Create(data: CreateExampleDto): Promise<ExampleEntity> {
    return await this.createExampleUseCase.execute(data);
  }

  @GrpcMethod('ExampleService', 'FindOneById')
  @UseFilters(new Http2gRPCExceptionFilter())
  async FindOneById(data: FindExampleByIdDto): Promise<ExampleEntity> {
    return await this.findExampleByIdUseCase.execute(data);
  }
}
