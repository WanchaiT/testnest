import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("main")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  getTest(): string {
    return this.appService.getTest();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return { id };
  }

  @Get(':id/ok/:name')
  async finds(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Param('name')
    name: String,
  ) {
    return { 'data' : { id, name }};
  }

}
