import { Controller, Get, Query } from '@nestjs/common';
import { OpenLibraryService } from '../open-library/open-library.service';

@Controller('api/v1/books')
export class BookController {
  constructor(private readonly openLibraryService: OpenLibraryService) {}

  @Get()
  search(@Query('q') query: string) {
    return this.openLibraryService.search(query);
  }
}
