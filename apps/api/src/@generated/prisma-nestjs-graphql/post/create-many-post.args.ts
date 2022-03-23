import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostCreateManyInput } from './post-create-many.input';

@ArgsType()
export class CreateManyPostArgs {

    @Field(() => [PostCreateManyInput], {nullable:false})
    data!: Array<PostCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
