import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}
  async createUser(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.db.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return `User created successfully:${JSON.stringify(user)}`;
  }
  findAllUsers() {
    return this.db.user.findMany();
  }
}
