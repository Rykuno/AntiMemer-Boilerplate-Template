import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';
import { PostOrderByWithRelationInput } from './post-order-by-with-relation.input';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PostScalarFieldEnum } from './post-scalar-field.enum';

@ArgsType()
export class FindFirstPostArgs {

    @Field(() => PostWhereInput, {nullable:true})
    where?: PostWhereInput;

    @Field(() => [PostOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PostOrderByWithRelationInput>;

    @Field(() => PostWhereUniqueInput, {nullable:true})
    cursor?: PostWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [PostScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PostScalarFieldEnum>;
}
