import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should return conflict error when user with given email already exist', () => {
      const payload: CreateUserDto = {
        email: 'existing-email@test.pl',
        password: '1234',
      };

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(new User());

      return expect(() => service.create(payload)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should return create new user when user with given email does not exist', async () => {
      const payload: CreateUserDto = {
        email: 'not-existing-email@test.pl',
        password: '1234',
      };
      const newUser = new User();
      newUser.id = 123;
      newUser.email = payload.email;
      newUser.password = 'secret-password-hash';

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(newUser);

      const result = await service.create(payload);

      expect(result).toEqual({
        id: newUser.id,
        email: newUser.email,
      });
      expect((result as any).password).toBe(undefined);
      return expect(repositoryMock.save).toHaveBeenCalled();
    });
  });
});
