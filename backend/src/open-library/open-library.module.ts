import { Module } from '@nestjs/common';
import { OpenLibraryService } from './open-library.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://openlibrary.org',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [OpenLibraryService],
  exports: [OpenLibraryService],
})
export class OpenLibraryModule {}
