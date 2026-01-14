import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
