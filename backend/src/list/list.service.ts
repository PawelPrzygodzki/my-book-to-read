import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AddBookDto } from './dto/add-book.dto';
import { BookService } from '../book/book.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    private readonly bookService: BookService,
  ) {}

  async create(createListDto: CreateListDto, currentUser: User) {
    const list: List = new List();
    list.name = createListDto.name;
    list.user = currentUser;

    const { user, ...result } = await this.listRepository.save(list);

    return result;
  }

  async findAllForUser(userId: number) {
    const [items, count] = await this.listRepository.findAndCount({
      where: { user: { id: userId } },
    });
    return {
      total: count,
      items,
    };
  }

  async findOne(id: number, user: User): Promise<List> {
    return await this.getListByIdForUserOrFail(id, user);
  }

  async update(id: number, updateListDto: UpdateListDto, user: User) {
    const list = await this.getListByIdForUserOrFail(id, user);

    list.name = updateListDto.name || list.name;
    return this.listRepository.save(list);
  }

  async remove(id: number, user: User) {
    const list = await this.getListByIdForUserOrFail(id, user);

    await this.listRepository.remove(list);

    return;
  }

  async addBookToList(id: number, addBookDto: AddBookDto, user: User) {
    // TODO add transaction to protect before race condition

    const [list, book] = await Promise.all([
      this.getListByIdForUserOrFail(id, user),
      this.bookService.findOneByExternalKey(addBookDto.key),
    ]);

    const bookIsAssigned = list.books.some(
      (assignedBook) => assignedBook.id === book.id,
    );

    if (bookIsAssigned) {
      return list;
    }

    list.books.push(book);

    return this.listRepository.save(list);
  }

  async removeBookFromList(listId: number, bookId: number, user: User) {
    // TODO add transaction to protect before race condition

    const list = await this.getListByIdForUserOrFail(listId, user);

    list.books = list.books.filter((book) => book.id !== bookId);

    await this.listRepository.save(list);

    return list;
  }

  private async getListByIdForUserOrFail(
    id: number,
    user: User,
  ): Promise<List> {
    const list = await this.listRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
      relations: ['books'],
    });

    if (!list) {
      throw new NotFoundException(`List with #id ${id} does not exist`);
    }

    return list;
  }
}
