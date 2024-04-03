import { ExampleEntity } from '@domain/entities/Example.entity';
import { ExampleRepository } from '@domain/repositories/example.repository';
import { FindExampleByIdUseCase } from '@domain/use-cases/findExampleById.use-case';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('FindExampleByIdUseCase', () => {
  let useCase: FindExampleByIdUseCase;
  let mockExampleRepository: Partial<ExampleRepository>;

  beforeEach(async () => {
    mockExampleRepository = {
      findOneById: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindExampleByIdUseCase,
        {
          provide: 'ExampleAdapter',
          useValue: mockExampleRepository,
        },
      ],
    }).compile();

    useCase = module.get<FindExampleByIdUseCase>(FindExampleByIdUseCase);
  });

  it('should return an example entity when found', async () => {
    const example = new ExampleEntity({
      id: 1,
      name: 'Some Name',
    });
    jest
      .spyOn(mockExampleRepository, 'findOneById')
      .mockResolvedValueOnce(example);

    expect(await useCase.execute({ id: 1 })).toEqual(example);
  });

  it('should throw a HttpException with HttpStatus.NOT_FOUND when no example is found', async () => {
    await expect(useCase.execute({ id: 1 })).rejects.toThrow(
      new HttpException('Example not found', HttpStatus.NOT_FOUND),
    );
  });
});
