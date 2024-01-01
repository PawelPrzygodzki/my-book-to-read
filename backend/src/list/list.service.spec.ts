import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { List } from './entities/list.entity';
import { BookService } from '../book/book.service';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Book } from '../book/entities/book.entity';

const mockListRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockBookService = () => ({
  findOneByExternalKey: jest.fn(),
});

describe('ListService', () => {
  let service: ListService;
  let repositoryMock: Repository<List>;
  let bookServiceMock: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        { provide: getRepositoryToken(List), useFactory: mockListRepository },
        { provide: BookService, useFactory: mockBookService },
      ],
    }).compile();

    service = module.get<ListService>(ListService);
    repositoryMock = module.get(getRepositoryToken(List));
    bookServiceMock = module.get<BookService>(BookService);
  });

  describe('addBookToList', () => {
    it('should return not found error when list does not exist', () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

      return expect(() =>
        service.addBookToList(1, { key: 'book-key' }, new User()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return bad request error when book does not exist', () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(new List());
      jest
        .spyOn(bookServiceMock, 'findOneByExternalKey')
        .mockRejectedValue(new BadRequestException());

      return expect(() =>
        service.addBookToList(1, { key: 'not-existing-book-key' }, new User()),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not add book twice when book is already assigned to list', async () => {
      const book = new Book();
      book.id = 123;

      const list = new List();
      list.books = [book];

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(list);
      jest
        .spyOn(bookServiceMock, 'findOneByExternalKey')
        .mockResolvedValue(book);
      const result = await service.addBookToList(
        1,
        { key: 'not-existing-book-key' },
        new User(),
      );

      expect(result).toBeInstanceOf(List);
      expect(result.books).toHaveLength(1);
      expect(result.books[0].id).toBe(123);
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it('should add book to list when book is not assigned to list', async () => {
      const book = new Book();
      book.id = 4321;

      const list = new List();
      list.books = [];

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(list);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(list);
      jest
        .spyOn(bookServiceMock, 'findOneByExternalKey')
        .mockResolvedValue(book);
      const result = await service.addBookToList(
        1,
        { key: 'not-existing-book-key' },
        new User(),
      );

      expect(result).toBeInstanceOf(List);
      expect(result.books).toHaveLength(1);
      expect(result.books[0].id).toBe(4321);
      expect(repositoryMock.save).toHaveBeenCalled();
    });
  });

  describe('removeBookFromList', () => {
    it('should return not found error when list does not exist', () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

      return expect(() =>
        service.removeBookFromList(1, 321, new User()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return list when book is not assigned to list', async () => {
      const bookId = 321;
      const list = new List();
      list.books = [new Book()];

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(list);
      const result = await service.removeBookFromList(1, bookId, new User());

      expect(result).toBeInstanceOf(List);
      expect(result.books).toHaveLength(1);
    });

    it('should remove book from list when book is assigned to list', async () => {
      const book = new Book();
      book.id = 4321;

      const list = new List();
      list.books = [book];

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(list);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(list);
      const result = await service.removeBookFromList(1, book.id, new User());

      expect(result).toBeInstanceOf(List);
      expect(result.books).toHaveLength(0);
      expect(repositoryMock.save).toHaveBeenCalled();
    });
  });
});
