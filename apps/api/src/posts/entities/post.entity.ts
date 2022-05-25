import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { BaseModel } from 'src/common/entities/base.entity';

@ObjectType()
export class Post extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
}
