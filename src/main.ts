import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { HttpExceptionFilter } from './test-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger)
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
