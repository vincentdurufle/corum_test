import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { Public } from '../common/decorators';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.findOne(id);
  }

  @Public()
  @ApiBadRequestResponse({ description: 'Body does not meet requirements' })
  @ApiConflictResponse({ description: 'Email already exists' })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.create(createUserDto);
  }

  @ApiBadRequestResponse({ description: 'Body does not meet requirements' })
  @ApiConflictResponse({ description: 'Email already exists' })
  @ApiBody({
    description: 'Credentials for login',
    type: UpdateUserDto,
    examples: {
      basic: {
        value: {
          firstName: 'John',
        },
      },
    },
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
