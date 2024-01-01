import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;
}
