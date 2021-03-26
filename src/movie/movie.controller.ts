import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
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

    @Get(':id') // Get /movies/11
    async findMobvie(@Param('id') id: number): Promise<Movie> {
        return await this.movieService.findOne(id)
    }

    @Put(':id') // Put /movies/11
    async updateMovie(
        @Param('id') id: number, 
        @Body() createMovieDto: CreateMovieDto,
    ): Promise<Movie> {
        const movie = await this.movieService.findOne(id)
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
