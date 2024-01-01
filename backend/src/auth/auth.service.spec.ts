import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as argon2 from 'argon2';

const mockUserService = () => ({
  findByEmail: jest.fn(),
});

const mockJwtService = () => ({
  signAsync: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should throw unauthorized error', () => {
    it('when user with given email does not exist', () => {
      const payloadToSign = {
        email: 'not-existing@email.com',
        password: 'test1234',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      expect(() =>
        service.signIn(payloadToSign.email, payloadToSign.password),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('when given password not match to user password', async () => {
      const payloadToSign = {
        email: 'existing@email.com',
        password: 'test1234',
      };
      const user = new User();
      user.id = 123;
      user.email = payloadToSign.email;
      user.password = await argon2.hash('other-password');

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

      return expect(() =>
        service.signIn(payloadToSign.email, payloadToSign.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('should return access token', () => {
    it('when user exist and password match to user password', async () => {
      const tokenWithPayload = 'tokenWithPayload';
      const payloadToSign = {
        email: 'existing@email.com',
        password: 'test1234',
      };
      const user = new User();
      user.id = 123;
      user.email = payloadToSign.email;
      user.password = await argon2.hash(payloadToSign.password);

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(tokenWithPayload);

      const result = await service.signIn(
        payloadToSign.email,
        payloadToSign.password,
      );
      return expect(result).toEqual({
        accessToken: tokenWithPayload,
      });
    });
  });
});
