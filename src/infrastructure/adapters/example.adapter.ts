import { ExampleEntity } from '@domain/entities/Example.entity';
import { PrismaDatabase } from '@infrastructure/database/prisma.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleAdapter {
  constructor(private readonly prismaDatabase: PrismaDatabase) {}

  // TODO: Replace this method with the actual implementation
  async findOneById(id: number): Promise<ExampleEntity | null> {
    return this.prismaDatabase.example.findFirst({
      where: { id },
    });
  }

  async createOne(data: ExampleEntity): Promise<ExampleEntity> {
    return this.prismaDatabase.example.create({
      data,
    });
  }
}
