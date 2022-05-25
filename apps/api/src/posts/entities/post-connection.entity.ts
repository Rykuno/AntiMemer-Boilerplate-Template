import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Post } from './post.entity';

@ObjectType()
export class PostConnection extends PaginatedResponse(Post) {}
