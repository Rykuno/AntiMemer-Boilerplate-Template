import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';

@InputType()
export class UserCreateOrConnectWithoutPostsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutPostsInput, {nullable:false})
    create!: UserCreateWithoutPostsInput;
}
