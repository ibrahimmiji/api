import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return user;
  }
  findAllUsers() {
    return this.db.user.findMany();
  }
  async findUserByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }
  async findUserById(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }
  async updateUser(id: number, dto: UpdateUserDto) {
    return this.db.user.update({ where: { id }, data: dto });
  }
  async deleteUser(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}
