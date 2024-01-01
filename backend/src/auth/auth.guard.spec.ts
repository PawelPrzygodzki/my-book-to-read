import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { User } from '../user/entities/user.entity';

const mockUserService = () => ({
  findByEmail: jest.fn(),
});

const mockJwtService = () => ({
  verifyAsync: jest.fn(),
});
const mockReflector = () => ({
  getAllAndOverride: jest.fn(),
});

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: Reflector, useFactory: mockReflector },
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);

    reflector = module.get<Reflector>(Reflector);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const context = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn(() => ({
      getRequest: jest.fn(() => ({
        headers: {
          authorization: 'Bearer test-valid-token',
        },
      })),
    })),
  } as any as ExecutionContext;

  describe('should allow access', () => {
    beforeEach(() => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true); // Endpoint is mark as public
    });

    it('when endpoint is public', async () => {
      const result = await guard.canActivate(context);

      return expect(result).toBeTruthy();
    });

    describe('when endpoint is not public', () => {
      beforeEach(() => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false); // Endpoint is not mark as public
      });

      it('and user access token is valid', async () => {
        const validPayload = {
          email: 'valid-email@jwt.pl',
        };
        const user = new User();
        user.email = validPayload.email;

        jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(validPayload);
        jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

        const result = await guard.canActivate(context);

        return expect(result).toBeTruthy();
      });
    });
  });

  describe('should not allow access', () => {
    describe('when endpoint is not public', () => {
      beforeEach(() => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false); // Endpoint is not mark as public
      });

      it('and user access token is not valid', async () => {
        jest
          .spyOn(jwtService, 'verifyAsync')
          .mockRejectedValue(new Error('invalid token'));

        return expect(() => guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it('and user does not exist', async () => {
        const validPayload = {
          email: 'valid-email@jwt.pl',
        };

        jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(validPayload);
        jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

        return expect(() => guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });
    });
  });
});
