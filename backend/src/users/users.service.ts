import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    // TODO Pagination
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.#getUser(id);

    delete user.password;

    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.#getUser(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async #getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
