import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { CurrentUser } from '../decorator/user.decorator';
import { User } from '../user/entities/user.entity';
import { AddBookDto } from './dto/add-book.dto';

@Controller('api/v1/lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto, @CurrentUser() user: User) {
    return this.listService.create(createListDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.findOne(+id, user);
  }

  @Post(':id/books')
  addBookToList(
    @Param('id') id: string,
    @Body() addBookDto: AddBookDto,
    @CurrentUser() user: User,
  ) {
    return this.listService.addBookToList(+id, addBookDto, user);
  }

  @Delete(':listId/books/:bookId')
  removeBookFromList(
    @Param('listId') listId: string,
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.listService.removeBookFromList(+listId, +bookId, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @CurrentUser() user: User,
  ) {
    return this.listService.update(+id, updateListDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.remove(+id, user);
  }
}
