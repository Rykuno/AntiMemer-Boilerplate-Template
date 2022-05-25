import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { BaseModel } from 'src/common/entities/base.entity';

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  avatar: string;

  @HideField()
  password: string;
}
