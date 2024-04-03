import { ExampleEntity } from '@domain/entities/example.entity';

export interface ExampleRepository {
  findOneById(id: number): Promise<ExampleEntity>;
  createOne(entity: ExampleEntity): Promise<ExampleEntity>;
}
