import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';
import { UserCreateOrConnectWithoutPostsInput } from './user-create-or-connect-without-posts.input';
import { UserUpsertWithoutPostsInput } from './user-upsert-without-posts.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutPostsInput } from './user-update-without-posts.input';

@InputType()
export class UserUpdateOneWithoutPostsInput {

    @Field(() => UserCreateWithoutPostsInput, {nullable:true})
    create?: UserCreateWithoutPostsInput;

    @Field(() => UserCreateOrConnectWithoutPostsInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput;

    @Field(() => UserUpsertWithoutPostsInput, {nullable:true})
    upsert?: UserUpsertWithoutPostsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutPostsInput, {nullable:true})
    update?: UserUpdateWithoutPostsInput;
}
