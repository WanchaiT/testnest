import { Test, TestingModule } from '@nestjs/testing';
import { TestExceptionService } from './test-exception.service';

describe('TestExceptionService', () => {
  let service: TestExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestExceptionService],
    }).compile();

    service = module.get<TestExceptionService>(TestExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
