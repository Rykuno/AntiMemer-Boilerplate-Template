import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutPostsInput } from './user-update-without-posts.input';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';

@InputType()
export class UserUpsertWithoutPostsInput {

    @Field(() => UserUpdateWithoutPostsInput, {nullable:false})
    update!: UserUpdateWithoutPostsInput;

    @Field(() => UserCreateWithoutPostsInput, {nullable:false})
    create!: UserCreateWithoutPostsInput;
}
