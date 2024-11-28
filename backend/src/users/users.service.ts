import * as argon from 'argon2';
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

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const alreadyExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.#hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        birthdate: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    await this.#getUser(id);
    let hashedPassword: string | undefined;

    if (updateUserDto.password) {
      hashedPassword = await this.#hashPassword(updateUserDto.password);
    }

    const response = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
    });

    delete response.password;

    return response;
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

  #hashPassword(password: string): Promise<string> {
    return argon.hash(password);
  }
}
