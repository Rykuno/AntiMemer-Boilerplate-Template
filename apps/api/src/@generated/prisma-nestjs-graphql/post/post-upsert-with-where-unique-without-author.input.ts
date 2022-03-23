import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithoutAuthorInput } from './post-update-without-author.input';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';

@InputType()
export class PostUpsertWithWhereUniqueWithoutAuthorInput {

    @Field(() => PostWhereUniqueInput, {nullable:false})
    where!: PostWhereUniqueInput;

    @Field(() => PostUpdateWithoutAuthorInput, {nullable:false})
    update!: PostUpdateWithoutAuthorInput;

    @Field(() => PostCreateWithoutAuthorInput, {nullable:false})
    create!: PostCreateWithoutAuthorInput;
}
