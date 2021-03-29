import { Injectable, Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
      return null
    }
  }

  async findOneByName(name: string): Promise<Movie> {
    var movie = await this.movieRepository.findOne({ name: name });
    if (movie != null) {
      return movie
    } else {
      return null
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.movieRepository.delete({ id: id });
  }
}