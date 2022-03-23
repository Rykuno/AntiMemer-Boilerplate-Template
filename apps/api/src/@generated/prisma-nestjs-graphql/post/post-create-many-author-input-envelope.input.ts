import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostCreateManyAuthorInput } from './post-create-many-author.input';

@InputType()
export class PostCreateManyAuthorInputEnvelope {

    @Field(() => [PostCreateManyAuthorInput], {nullable:false})
    data!: Array<PostCreateManyAuthorInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
