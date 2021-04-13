import { Module } from '@nestjs/common';
import { TestExceptionService } from './test-exception.service';

@Module({
  providers: [TestExceptionService]
})
export class TestExceptionModule { }
