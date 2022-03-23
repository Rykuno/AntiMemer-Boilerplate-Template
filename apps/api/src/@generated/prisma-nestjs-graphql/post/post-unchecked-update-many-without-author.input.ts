import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';
import { PostCreateOrConnectWithoutAuthorInput } from './post-create-or-connect-without-author.input';
import { PostUpsertWithWhereUniqueWithoutAuthorInput } from './post-upsert-with-where-unique-without-author.input';
import { PostCreateManyAuthorInputEnvelope } from './post-create-many-author-input-envelope.input';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithWhereUniqueWithoutAuthorInput } from './post-update-with-where-unique-without-author.input';
import { PostUpdateManyWithWhereWithoutAuthorInput } from './post-update-many-with-where-without-author.input';
import { PostScalarWhereInput } from './post-scalar-where.input';

@InputType()
export class PostUncheckedUpdateManyWithoutAuthorInput {

    @Field(() => [PostCreateWithoutAuthorInput], {nullable:true})
    create?: Array<PostCreateWithoutAuthorInput>;

    @Field(() => [PostCreateOrConnectWithoutAuthorInput], {nullable:true})
    connectOrCreate?: Array<PostCreateOrConnectWithoutAuthorInput>;

    @Field(() => [PostUpsertWithWhereUniqueWithoutAuthorInput], {nullable:true})
    upsert?: Array<PostUpsertWithWhereUniqueWithoutAuthorInput>;

    @Field(() => PostCreateManyAuthorInputEnvelope, {nullable:true})
    createMany?: PostCreateManyAuthorInputEnvelope;

    @Field(() => [PostWhereUniqueInput], {nullable:true})
    set?: Array<PostWhereUniqueInput>;

    @Field(() => [PostWhereUniqueInput], {nullable:true})
    disconnect?: Array<PostWhereUniqueInput>;

    @Field(() => [PostWhereUniqueInput], {nullable:true})
    delete?: Array<PostWhereUniqueInput>;

    @Field(() => [PostWhereUniqueInput], {nullable:true})
    connect?: Array<PostWhereUniqueInput>;

    @Field(() => [PostUpdateWithWhereUniqueWithoutAuthorInput], {nullable:true})
    update?: Array<PostUpdateWithWhereUniqueWithoutAuthorInput>;

    @Field(() => [PostUpdateManyWithWhereWithoutAuthorInput], {nullable:true})
    updateMany?: Array<PostUpdateManyWithWhereWithoutAuthorInput>;

    @Field(() => [PostScalarWhereInput], {nullable:true})
    deleteMany?: Array<PostScalarWhereInput>;
}
