import { Controller, Get, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('test-exception')
// @UseFilters(HttpExceptionFilter)

export class TestExceptionController {

    @Get()
    async findAll() {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
        }, HttpStatus.FORBIDDEN);
    }

    @Get("class")
    async findAllClass() {
        throw new ForbiddenException()
    }

    @Get("excep-filter")
    async testExcepFilter() {
        throw new ForbiddenException()
    }
}
