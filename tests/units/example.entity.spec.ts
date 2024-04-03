import { ExampleEntity } from '@domain/entities/example.entity';
import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

describe('ExampleEntity', () => {
  it('should expose specified fields', () => {
    const entity = new ExampleEntity({ id: 1, name: ' Test Name ' });

    const obj = plainToInstance(ExampleEntity, entity, {
      excludeExtraneousValues: true,
    });

    expect(obj).toEqual({
      id: 1,
      custom_id: expect.any(String),
      name: 'Test Name',
    });
  });

  it('should trim the name field', () => {
    const entity = new ExampleEntity({ name: ' Test Name ' });
    const obj = plainToInstance(ExampleEntity, entity, {
      excludeExtraneousValues: true,
    });
    expect(obj.name).toBe('Test Name');
  });

  it('should generate a random custom_id', () => {
    const entity1 = new ExampleEntity({});
    const entity2 = new ExampleEntity({});

    expect(entity1.custom_id).toBeDefined();
    expect(entity2.custom_id).toBeDefined();
    expect(entity1.custom_id).not.toBe(entity2.custom_id);
  });

  it('allows partial creation', () => {
    const partialData = { name: 'Partial Name' };
    const entity = new ExampleEntity(partialData);

    expect(entity).toMatchObject(partialData);
    expect(entity.custom_id).toBeDefined();
  });
});
