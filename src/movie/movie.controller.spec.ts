import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { Any, DeleteResult, getRepository } from 'typeorm';
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

			var spy = jest.spyOn(service, 'createOrUpdate').mockImplementation(async () => mockCreateMovie)
			console.log(mockCreateMovie)

			var response = await controller.createMovie(mockCreateMovie)
			expect(spy).toHaveBeenCalled()
			expect(response).toMatchObject(mockCreateMovie)

		})
	})

	describe('test_update_movie', () => {
		it('shuld update harry1', async () => {
			var mockCreateMovie = new Movie()
			mockCreateMovie.name = "harry4"
			mockCreateMovie.score = 1.0

			var spy = jest.spyOn(service, 'createOrUpdate').mockImplementation(async () => mockCreateMovie)
			console.log(mockCreateMovie)

			var response = await controller.updateMovie(8, mockCreateMovie)
			expect(spy).toHaveBeenCalled()
			expect(response).toMatchObject(mockCreateMovie)
		})
	})

	describe('test_delete_movie', () => {
		it('should delate harry1', async () => {
			var mockMovieDelete: Promise<DeleteResult>
			var mockMovie = new Movie()
			mockMovie.id = 99
			mockMovie.name = "harry1"
			mockMovie.score = 5.6
			console.log(mockMovieDelete)

			var spyFindId = jest.spyOn(service, 'findOneById').mockImplementation(async () => mockMovie)
			// var spyDelete = jest.spyOn(service, 'delete').mockImplementation(async () => mockMovieDelete)
			var response = await controller.deleteMovie(99)
			console.log(response)
			
			expect(spyFindId).toHaveBeenCalled()
			// expect(spyDelete).toHaveBeenCalled()
			expect(response).toMatchObject(
				{
					result: "ok"
				}
			)
		})
	})

	describe('test_getOne_by_name', () => {
		it('should return json kong', async () => {
			// var result: Promise<Movie>
			// jest.spyOn(service, 'findOneByName').mockImplementation(() => result)
			// console.log((await result).name)
			var mockMovie = new Movie()
			mockMovie.id = 6
			mockMovie.name = "Kong"
			mockMovie.score = 8.8

			var spy = jest.spyOn(service, 'findOneByName').mockImplementation(async () => mockMovie)
			console.log(spy)
			var response = await controller.findMovieByName(mockMovie.name)

			expect(spy).toHaveBeenCalled()
			expect(response).toMatchObject(mockMovie)
		});

		it('should return json the lord', async () => {
			var mockMovie = new Movie()
			mockMovie.id = 7
			mockMovie.name = "The lord of the ring 3"
			mockMovie.score = 9.3

			var spy = jest.spyOn(service, 'findOneByName').mockImplementation(async () => mockMovie)
			console.log(spy)
			var response = await controller.findMovieByName(mockMovie.name)
			
			expect(spy).toHaveBeenCalled()
			expect(response).toMatchObject(mockMovie)
		})
	})

	// describe('test_getOne_by_name_throw', () => {
	//   it('should throw obj', async () => {
	//     var result: Promise<Movie>
	//     var throwErr = new HttpException(`No content name "no name" database`, HttpStatus.NOT_FOUND)
	//     try {
	//       var spy = jest.spyOn(service, 'findOneByName').mockImplementation(async () => null)
	//       // var spy = jest.spyOn(controller, 'findMovieByName')
	//       //   .mockRejectedValue(async() => new HttpException(`No content name no name database`, HttpStatus.NOT_FOUND));
	//       var response = await controller.findMovieByName("no name")
	//     } catch (e) {
	//       console.log(`e ${e}`)
	//       console.log(`throwErr.message ${throwErr}`)
	//       // console.log(`response ${response}`)
	//       expect(spy).toHaveBeenCalled()
	//       expect(e).toStrictEqual(throwErr)
	//     }
	//   });
	// })

	// describe('test_getOne_by_id_throw', () => {
	//   it('should throw obj', async () => {
	//     var result: Promise<Movie>
	//     var throwErr = new HttpException(`No content id 60 database`, HttpStatus.NOT_FOUND)
	//     try {
	//       var spy = jest.spyOn(service, 'findOneById').mockImplementation(async () => null)
	//       // var spy = jest.spyOn(controller, 'findMovieByName')
	//       //   .mockRejectedValue(async() => new HttpException(`No content name no name database`, HttpStatus.NOT_FOUND));
	//       var response = await controller.findMovieById(60)
	//     } catch (e) {
	//       console.log(`e ${e}`)
	//       console.log(`throwErr.message ${throwErr}`)
	//       // console.log(`response ${response}`)
	//       expect(spy).toHaveBeenCalled()
	//       expect(e).toStrictEqual(throwErr)
	//     }
	//   });
	// })

	describe('test_getOne_by_id', () => {
		it('should return json 6', async () => {
			var mockMovie = new Movie()
			mockMovie.id = 6
			mockMovie.name = "Kong"
			mockMovie.score = 8.8
			
			var spy = jest.spyOn(service, 'findOneById').mockImplementation(async () => mockMovie)
			var response = await controller.findMovieById(6)

			expect(spy).toBeCalled()
			expect(response).toMatchObject(mockMovie);
		});

		it('should return json 7', async () => {
			var mockMovie = new Movie()
			mockMovie.id = 7
			mockMovie.name = "The lord of the ring 3"
			mockMovie.score = 9.3
			
			var spy = jest.spyOn(service, 'findOneById').mockImplementation(async () => mockMovie)
			var response = await controller.findMovieById(7)
			
			expect(spy).toBeCalled()
			expect(response).toMatchObject(mockMovie);
		})
	})

	describe('test_getAll', () => {
		it('should return json All', async () => {
			// var result: Promise<Movie[]>
			var movies = new Array<Movie>()
			movies.push(
				(
					{
						id: 99,
						name: "harry",
						score: 5.6,
					}
				) as Movie,
				(
					{
						id: 44,
						name: "ok",
						score: 5.6,
					}
				) as Movie
			)
			jest.spyOn(service, 'findAll').mockImplementation(async () => movies)

			var response = await controller.findAllMovies()
			console.log(response)
			expect(response).toBe(movies)
		});
	})
});
