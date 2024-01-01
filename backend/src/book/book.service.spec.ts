import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { OpenLibraryService } from '../open-library/open-library.service';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

const mockOpenLibraryService = () => ({
  findBookByKey: jest.fn(),
});

const mockBookRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});
describe('BookService', () => {
  let service: BookService;
  let openLibraryService: OpenLibraryService;
  let repositoryMock: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: OpenLibraryService, useFactory: mockOpenLibraryService },
        { provide: getRepositoryToken(Book), useFactory: mockBookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    openLibraryService = module.get<OpenLibraryService>(OpenLibraryService);
    repositoryMock = module.get(getRepositoryToken(Book));
  });

  describe('addBookByExternalKey', () => {
    describe('should throw bad request error', () => {
      it('when book does not exist in open library', () => {
        jest.spyOn(openLibraryService, 'findBookByKey').mockResolvedValue(null);

        expect(() =>
          service.addBookByExternalKey('not-existing-key'),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('should save now book', () => {
      it('when book does not exist in open library', async () => {
        const key = 'existing-key';

        jest
          .spyOn(openLibraryService, 'findBookByKey')
          .mockResolvedValue({
            key,
            title: 'book title',
            authorName: 'interesting author',
          });

        await service.addBookByExternalKey(key);

        expect(repositoryMock.save).toHaveBeenCalled();
      });
    });
  });

  describe('findOneByExternalKey', () => {
    describe('should return book from database ', () => {
      it('when book exist in database', async () => {
        const key = 'key-in-database';

        jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(new Book());

        const result = await service.findOneByExternalKey(key);

        expect(result).toBeInstanceOf(Book);
        expect(repositoryMock.save).not.toHaveBeenCalled();
      });
    });

    describe('should save now book', () => {
      it('when book does not exist in open library', async () => {
        const key = 'existing-key';

        jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);
        jest.spyOn(repositoryMock, 'save').mockResolvedValue(new Book());
        jest
          .spyOn(openLibraryService, 'findBookByKey')
          .mockResolvedValue({
            key,
            title: 'book title',
            authorName: 'interesting author',
          });

        const result = await service.findOneByExternalKey(key);

        expect(result).toBeInstanceOf(Book);
        expect(repositoryMock.save).toHaveBeenCalled();
      });
    });
  });
});
