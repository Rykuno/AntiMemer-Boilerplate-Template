import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';

@InputType()
export class PostCreateOrConnectWithoutAuthorInput {

    @Field(() => PostWhereUniqueInput, {nullable:false})
    where!: PostWhereUniqueInput;

    @Field(() => PostCreateWithoutAuthorInput, {nullable:false})
    create!: PostCreateWithoutAuthorInput;
}
