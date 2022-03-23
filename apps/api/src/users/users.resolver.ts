import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindUniqueUserArgs } from '../@generated/prisma-nestjs-graphql/user/find-unique-user.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => User, { nullable: true })
  async me(@UserEntity() user: User): Promise<User | null> {
    return user;
  }

  @Query(() => User, { nullable: true })
  async user(@Args() args: FindUniqueUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { ...args.where } });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  // @ResolveField('posts')
  // posts(@Parent() author: User) {
  //   return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  // }

  @ResolveField(() => String)
  avatar(@Parent() user: User) {
    return (
      user?.avatar ||
      `https://avatars.dicebear.com/api/identicon/${user.id}.svg?scale=90`
    );
  }
}
