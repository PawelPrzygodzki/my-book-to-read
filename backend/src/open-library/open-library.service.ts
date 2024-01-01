import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable()
export class OpenLibraryService {
  // TODO make it more generic
  constructor(private readonly httpService: HttpService) {}

  async search(q: string) {
    // TODO add correct interface
    const { data } = await firstValueFrom(
      this.httpService.get(
        `/search.json?q=${q}&fields=key,author_name,title&limit=10`,
      ),
    );

    return {
      total: data.num_found,
      items: data.docs.map(
        (doc: { key: string; title: string; author_name: string[] }) => ({
          key: doc.key,
          title: doc.title,
          authorName: doc.author_name.join(', '),
        }),
      ),
    };
  }

  async findBookByKey(key: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${key}.json`).pipe(
        catchError((error: AxiosError) => {
          if (error?.response?.status === 404) {
            return of({ data: null });
          }

          throw new InternalServerErrorException();
        }),
      ),
    );

    if (!data) {
      return null;
    }

    const authors = await Promise.all(
      data.authors.map((author: any) =>
        this.findAuthorByKey(author.author.key),
      ),
    );

    return {
      key: data.key,
      title: data.title,
      authorName: authors.map((author) => author.fullName).join(', '),
    };
  }

  async findAuthorByKey(key: string) {
    const { data } = await firstValueFrom(this.httpService.get(`${key}.json`));

    return {
      key: data.key,
      fullName: data.fuller_name || data.name,
    };
  }
}
