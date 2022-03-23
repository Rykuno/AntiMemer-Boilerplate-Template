import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';
import { PostOrderByWithAggregationInput } from './post-order-by-with-aggregation.input';
import { PostScalarFieldEnum } from './post-scalar-field.enum';
import { PostScalarWhereWithAggregatesInput } from './post-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { PostCountAggregateInput } from './post-count-aggregate.input';
import { PostMinAggregateInput } from './post-min-aggregate.input';
import { PostMaxAggregateInput } from './post-max-aggregate.input';

@ArgsType()
export class PostGroupByArgs {

    @Field(() => PostWhereInput, {nullable:true})
    where?: PostWhereInput;

    @Field(() => [PostOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PostOrderByWithAggregationInput>;

    @Field(() => [PostScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof PostScalarFieldEnum>;

    @Field(() => PostScalarWhereWithAggregatesInput, {nullable:true})
    having?: PostScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => PostCountAggregateInput, {nullable:true})
    _count?: PostCountAggregateInput;

    @Field(() => PostMinAggregateInput, {nullable:true})
    _min?: PostMinAggregateInput;

    @Field(() => PostMaxAggregateInput, {nullable:true})
    _max?: PostMaxAggregateInput;
}
