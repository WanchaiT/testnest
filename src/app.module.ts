import { Global, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { MovieController } from './movie/movie.controller';
import { Movie } from './movie/movie.entity';
import { MovieModule } from './movie/movie.module';
import { MovieService } from './movie/movie.service';
import { TestExceptionController } from './test-exception/test-exception.controller';
import { TestExceptionModule } from './test-exception/test-exception.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [Movie],
      keepConnectionAlive: true,
      synchronize: process.env.NODE_ENV != 'production',
    }),
    MovieModule,
    TestExceptionModule, 

  ],
  controllers: [AppController, TestExceptionController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('main');
  }
}