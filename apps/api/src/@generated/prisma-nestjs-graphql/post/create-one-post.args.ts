import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostCreateInput } from './post-create.input';

@ArgsType()
export class CreateOnePostArgs {

    @Field(() => PostCreateInput, {nullable:false})
    data!: PostCreateInput;
}
