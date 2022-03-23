import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithoutAuthorInput } from './post-update-without-author.input';

@InputType()
export class PostUpdateWithWhereUniqueWithoutAuthorInput {

    @Field(() => PostWhereUniqueInput, {nullable:false})
    where!: PostWhereUniqueInput;

    @Field(() => PostUpdateWithoutAuthorInput, {nullable:false})
    data!: PostUpdateWithoutAuthorInput;
}
