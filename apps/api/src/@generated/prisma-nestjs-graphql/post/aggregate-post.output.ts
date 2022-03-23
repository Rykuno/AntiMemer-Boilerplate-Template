import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PostCountAggregate } from './post-count-aggregate.output';
import { PostMinAggregate } from './post-min-aggregate.output';
import { PostMaxAggregate } from './post-max-aggregate.output';

@ObjectType()
export class AggregatePost {

    @Field(() => PostCountAggregate, {nullable:true})
    _count?: PostCountAggregate;

    @Field(() => PostMinAggregate, {nullable:true})
    _min?: PostMinAggregate;

    @Field(() => PostMaxAggregate, {nullable:true})
    _max?: PostMaxAggregate;
}
