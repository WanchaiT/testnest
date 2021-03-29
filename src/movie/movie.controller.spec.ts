import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { Any, getRepository } from 'typeorm';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieModule } from './movie.module';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MovieModule, AppModule],
      providers: [MovieService],
      controllers: [MovieController],
    }).compile();

    service = module.get<MovieService>(MovieService)
    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test_getOne_by_name', () => {
    it('should return json kong', async () => {
      // var result: Promise<Movie>
      // jest.spyOn(service, 'findOneByName').mockImplementation(() => result)
      // console.log((await result).name)
      expect(await controller.findMovieByName("Kong")).toMatchObject(
        { 
          id : 6,
          name : "Kong",
          score : 8.8,
        }
      );
      expect(await controller.findMovieByName("The lord of the ring 3")).toMatchObject(
        { 
          id : 7,
          name : "The lord of the ring 3",
          score : 9.3,
        }
      );
    });
  })

  describe('test_getOne_by_id', () => {
    it('should return json', async () => {
      // var result: Promise<Movie>
      // jest.spyOn(service, 'findOneById').mockImplementation(() => result)
      expect(await controller.findMovieById(6)).toMatchObject(
        { 
          id : 6,
          name : "Kong",
          score : 8.8,
        }
      );
      expect(await controller.findMovieById(7)).toMatchObject(
        { 
          id : 7,
          name : "The lord of the ring 3",
          score : 9.3,
        }
      );
    });
  })

  describe('test_getAll', () => {
    it('should return json All', async () => {
      var result: Promise<Movie[]>
      jest.spyOn(service, 'findAll').mockImplementation(() => result)
      // console.log(result.)
      expect(await controller.findAllMovies()).toBe(result)
    });
  })
});
