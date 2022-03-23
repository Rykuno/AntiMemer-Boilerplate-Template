import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostScalarWhereInput } from './post-scalar-where.input';
import { PostUpdateManyMutationInput } from './post-update-many-mutation.input';

@InputType()
export class PostUpdateManyWithWhereWithoutAuthorInput {

    @Field(() => PostScalarWhereInput, {nullable:false})
    where!: PostScalarWhereInput;

    @Field(() => PostUpdateManyMutationInput, {nullable:false})
    data!: PostUpdateManyMutationInput;
}
