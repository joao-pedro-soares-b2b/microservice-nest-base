import { ExampleEntity } from '@domain/entities/Example.entity';
import { ExampleRepository } from '@domain/repositories/example.repository';
import { CreateExampleUseCase } from '@domain/use-cases/createExample.use-case';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

describe('CreateExampleUseCase', () => {
  let useCase: CreateExampleUseCase;
  let mockExampleRepository: Partial<ExampleRepository>;

  beforeEach(async () => {
    mockExampleRepository = {
      createOne: jest.fn((entity) => Promise.resolve(entity)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateExampleUseCase,
        {
          provide: 'ExampleAdapter',
          useValue: mockExampleRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateExampleUseCase>(CreateExampleUseCase);
  });

  it('should create and return an example entity', async () => {
    const createExampleDto = {
      id: 1,
      name: 'Some Name',
      custom_id: randomUUID(),
    };

    const expectedEntity = new ExampleEntity(createExampleDto);

    jest
      .spyOn(mockExampleRepository, 'createOne')
      .mockResolvedValueOnce(expectedEntity);

    const result = await useCase.execute(createExampleDto);

    expect(result).toEqual(expectedEntity);
    expect(mockExampleRepository.createOne).toHaveBeenCalledWith(
      expectedEntity,
    );
  });

  it('should log and rethrow the error if the creation fails', async () => {
    const createExampleDto = {
      id: 1,
      name: 'Some Name',
      custom_id: randomUUID(),
    };

    const error = new Error('Failed to create example').message;

    jest.spyOn(mockExampleRepository, 'createOne').mockRejectedValueOnce(error);
    const loggerSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => {});

    await expect(useCase.execute(createExampleDto)).rejects.toThrow(error);
    expect(loggerSpy).toHaveBeenCalledWith(error);
  });
});
