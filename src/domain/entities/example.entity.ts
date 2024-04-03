// More info: https://docs.nestjs.com/techniques/serialization

import { Expose, Transform } from 'class-transformer';
import { randomUUID } from 'crypto';

export class ExampleEntity {
  @Expose()
  id: number;

  @Expose()
  custom_id?: string;

  @Expose()
  @Transform(({ value }) => value.trim())
  name: string;

  constructor(partial: Partial<ExampleEntity>) {
    this.custom_id = randomUUID();

    Object.assign(this, partial);
  }
}
