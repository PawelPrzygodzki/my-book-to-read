import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../decorator/public.decorator';
import { CurrentUser } from '../decorator/user.decorator';
import { User } from './entities/user.entity';
import { ListService } from '../list/list.service';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly listService: ListService,
  ) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/@me/lists')
  returnUserLists(@CurrentUser() currentUser: User) {
    return this.listService.findAllForUser(currentUser.id);
  }
}
