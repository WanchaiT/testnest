import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createOrUpdate(movie: Movie): Promise<Movie> {
    return await this.movieRepository.save(movie);
  }

  async findOneById(id: number): Promise<Movie> {
    var movie = await this.movieRepository.findOne({ id: id });
    if (movie != null) {
      return movie
    } else {
      throw new HttpException(`No content id ${id} database`, HttpStatus.NOT_FOUND);
    }
  }

  async findOneByName(name: string): Promise<Movie> {
    var movie = await this.movieRepository.findOne({ name: name });
    if (movie != null) {
      return movie
    } else {
      throw new HttpException(`No content name "${name}" database`, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async delete(id: number): Promise<DeleteResult> {
    var movie = await this.findOneById(id)
    if (movie == null) {
      throw new HttpException(`No content id ${id} database`, HttpStatus.NOT_FOUND);
    } else {
      return await this.movieRepository.delete({ id: id });
    }
  }
}