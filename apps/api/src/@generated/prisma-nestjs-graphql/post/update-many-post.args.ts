import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostUpdateManyMutationInput } from './post-update-many-mutation.input';
import { PostWhereInput } from './post-where.input';

@ArgsType()
export class UpdateManyPostArgs {

    @Field(() => PostUpdateManyMutationInput, {nullable:false})
    data!: PostUpdateManyMutationInput;

    @Field(() => PostWhereInput, {nullable:true})
    where?: PostWhereInput;
}
