import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';
import { UserCreateOrConnectWithoutPostsInput } from './user-create-or-connect-without-posts.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutPostsInput {

    @Field(() => UserCreateWithoutPostsInput, {nullable:true})
    create?: UserCreateWithoutPostsInput;

    @Field(() => UserCreateOrConnectWithoutPostsInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;
}
