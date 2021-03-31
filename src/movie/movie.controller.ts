import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Module } from 'node:module';
import { CreateMovieDto } from './movie.create-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post() // Post /movies
    @HttpCode(HttpStatus.CREATED)
    async createMovie(@Body() newMovie: CreateMovieDto): Promise<Movie> {
        const movie = new Movie()
        movie.name = newMovie.name
        movie.score = newMovie.score
        movie.description = newMovie.description
        return await this.movieService.createOrUpdate(movie)
    }

    @Get() // Get /movies
    async findAllMovies(): Promise<Movie[]> {
        return await this.movieService.findAll()
    }

    @Get("find") // Get /movies/name
    async findMovieByName(@Query('name') name: string): Promise<Movie> {
        var resultMovie = await this.movieService.findOneByName(name)
        if (resultMovie == null) {
            throw new HttpException(`No content name ${name} database`, HttpStatus.NOT_FOUND);
        } else {
            return resultMovie
        }
    }

    @Get(':id') // Get /movies/11
    async findMovieById(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number
    ) : Promise<Movie> {
        var resultMovie = await this.movieService.findOneById(id)
        if (resultMovie == null) {
            throw new HttpException(`No content id ${id} database`, HttpStatus.NOT_FOUND);
        } else {
            return resultMovie
        }
    }

    @Put(':id') // Put /movies/11
    async updateMovie(
        @Param('id') id: number, 
        @Body() createMovieDto: CreateMovieDto,
    ) : Promise<Movie> {
        const movie = await this.movieService.findOneById(id)
        movie.name = createMovieDto.name
        movie.score = createMovieDto.score
        movie.description = createMovieDto.description
        return await this.movieService.createOrUpdate(movie)
    }

    @Delete(':id')
    async deleteMovie(@Param('id') id: number) {
        await this.movieService.delete(id)
        return { success: true }
    }
}
