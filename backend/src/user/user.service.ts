import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as process from "process";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserWithEmailExist = !!(await this.findByEmail(
      createUserDto.email,
    ));

    if (isUserWithEmailExist) {
      throw new ConflictException('User with given email already exists');
    }

    const user: User = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const { password, ...result } = await this.userRepository.save(user);

    return result;
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
