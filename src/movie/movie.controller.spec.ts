import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { Any, getRepository } from 'typeorm';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieModule } from './movie.module';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './movie.create-movie.dto';
import { GoneException, HttpException, HttpStatus } from '@nestjs/common';

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

  describe('test_create_movie', () => {
    it('should create harry1', async () => {
      var mockCreateMovie = new Movie()
      mockCreateMovie.name = "harry4"
      mockCreateMovie.score = 7.3

      var spy = jest.spyOn(service, 'createOrUpdate').mockImplementation(async() => mockCreateMovie)
      console.log(mockCreateMovie)
      
      var response = await controller.createMovie(mockCreateMovie)
      expect(spy).toHaveBeenCalled()
      expect(response).toMatchObject(mockCreateMovie)
     
    })
  })

  describe('test_update_movie', () => {
    it('shuld update harry1', async () => {
      
    })
  })

  describe('test_getOne_by_name', () => {
    it('should return json kong', async () => {
      // var result: Promise<Movie>
      // jest.spyOn(service, 'findOneByName').mockImplementation(() => result)
      // console.log((await result).name)
      var response = await controller.findMovieByName("Kong")
      expect(response).toMatchObject(
        { 
          id : 6,
          name : "Kong",
          score : 8.8,
        }
      );
    });

    it('should return json the lord', async () => {
      var response = await controller.findMovieByName("The lord of the ring 3")
      expect(response).toMatchObject(
        { 
          id : 7,
          name : "The lord of the ring 3",
          score : 9.3,
        }
      );
    })
  })

  // describe('test_getOne_by_name_throw', () => {
  //   it('should throw obj', async () => {
  //     var result: Promise<Movie>
  //     var throwErr = new Error(`No content name no name database`)
  //     try {
  //       jest.spyOn(service, 'findOneByName').mockImplementation(() => null)
  //       var response = await controller.findMovieByName("no name")
  //     } catch (e) {
  //       console.log(e)
  //       console.log(throwErr)
  //       expect(e).toErr(throwErr.message)
  //     }
     
  //   });
  // })

  describe('test_getOne_by_id', () => {
    it('should return json 6', async () => {
      // var result: Promise<Movie>
      // jest.spyOn(service, 'findOneById').mockImplementation(() => result)
      var response = await controller.findMovieById(6)
      expect(response).toMatchObject(
        { 
          id : 6,
          name : "Kong",
          score : 8.8,
        }
      );
    });

    it('should return json 7', async () => {
      var response = await controller.findMovieById(7)
      expect(response).toMatchObject(
        { 
          id : 7,
          name : "The lord of the ring 3",
          score : 9.3,
        }
      );
    })
  })

  describe('test_getAll', () => {
    it('should return json All', async () => {
      var result: Promise<Movie[]>
      jest.spyOn(service, 'findAll').mockImplementation(() => result)
      
      var response = await controller.findAllMovies()
      // console.log(result.)
      expect(response).toBe(result)
    });
  })
});
