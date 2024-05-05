import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerDto = {
        "name": "Prueba",
        "email": "prueba1",
        "password": "1234",
        "DNI": "11111111P",
        "companyId": ""
      }

      const expectedResult = { message: 'Usuario registrado correctamente' };

      jest.spyOn(authService, 'register').mockResolvedValue(undefined);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expectedResult);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const loginDto = {
        "email": "prueba1",
        "password": "1234"
       };
       const expectedResult = {
        access_token: 'your_access_token',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'user',
          DNI: '12345678A',
          companyId: 'abc123',
          createAt: new Date(),
        },
      };


      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResult);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw UnauthorizedException if login fails', async () => {
      const loginDto = {
        "email": "prueba1",
        "password": "1234"
       };

      jest.spyOn(authService, 'login').mockResolvedValue({ access_token: null , user : null});

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });


});
