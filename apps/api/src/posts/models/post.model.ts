import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Post extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
}
