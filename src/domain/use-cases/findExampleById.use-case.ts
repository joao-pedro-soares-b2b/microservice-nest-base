import { FindExampleByIdDto } from '@domain/dto/findExampleById.dto';
import { ExampleEntity } from '@domain/entities/Example.entity';
import { ExampleRepository } from '@domain/repositories/example.repository';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class FindExampleByIdUseCase {
  private readonly logger = new Logger(FindExampleByIdUseCase.name);

  constructor(
    @Inject('ExampleAdapter')
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async execute(dto: FindExampleByIdDto): Promise<ExampleEntity> {
    try {
      const result = await this.exampleRepository.findOneById(dto.id);
      if (!result) {
        throw new HttpException('Example not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
