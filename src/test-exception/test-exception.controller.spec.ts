import { Test, TestingModule } from '@nestjs/testing';
import { TestExceptionController } from './test-exception.controller';

describe('TestExceptionController', () => {
  let controller: TestExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestExceptionController],
    }).compile();

    controller = module.get<TestExceptionController>(TestExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
