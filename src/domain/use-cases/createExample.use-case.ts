import { CreateExampleDto } from '@domain/dto/createExample.dto';
import { ExampleEntity } from '@domain/entities/Example.entity';
import { ExampleRepository } from '@domain/repositories/example.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CreateExampleUseCase {
  private readonly logger = new Logger(CreateExampleUseCase.name);

  constructor(
    @Inject('ExampleAdapter')
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async execute(dto: CreateExampleDto): Promise<ExampleEntity> {
    try {
      const entityToCreate = new ExampleEntity(dto);
      return await this.exampleRepository.createOne(entityToCreate);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
