import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';

@ArgsType()
export class DeleteManyPostArgs {

    @Field(() => PostWhereInput, {nullable:true})
    where?: PostWhereInput;
}
