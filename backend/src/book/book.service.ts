import { BadRequestException, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../list/entities/list.entity';
import { Repository } from 'typeorm';
import { OpenLibraryService } from '../open-library/open-library.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private readonly openLibraryService: OpenLibraryService,
  ) {}
  async findOneByExternalKey(key: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { externalKey: key },
    });

    if (!book) {
      // When is not in our database we create new record
      return this.addBookByExternalKey(key);
    }

    return book;
  }

  async addBookByExternalKey(key: string): Promise<Book> {
    const externalBookData = await this.openLibraryService.findBookByKey(key);

    if (!externalBookData) {
      throw new BadRequestException('Book with given key does not exist');
    }

    const book = new Book();
    book.externalKey = externalBookData.key;
    book.title = externalBookData.title;
    book.authorName = externalBookData.authorName;

    return this.bookRepository.save(book);
  }
}
