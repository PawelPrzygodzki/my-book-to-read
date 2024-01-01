import { IsString, Matches, MinLength } from 'class-validator';

export class AddBookDto {
  @IsString()
  @MinLength(2, { message: 'Book key must have at least 2 characters.' })
  @Matches(/\/works\/(.*)/)
  key: string;
}
