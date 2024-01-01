import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenLibraryModule } from '../open-library/open-library.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), BookModule, OpenLibraryModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
