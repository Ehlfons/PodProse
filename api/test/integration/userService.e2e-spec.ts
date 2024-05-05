import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      "name": "Manolo" ,
      "email": "manolo@manolo.com",
      "password": "1234",
      "DNI": "20099065P"
     };
    const expectedResult = {       
    "name": "Manolo" ,
    "email": "manolo@manolo.com",
    "password": "1234",
    "DNI": "20099065P" };

    (prismaService.user.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.create(createUserDto);

    expect(result).toEqual(expectedResult);
    expect(prismaService.user.create).toHaveBeenCalledWith({ data: createUserDto });
  });

  // Add more test cases for other methods of the service
});
