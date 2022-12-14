import { 
  Resolver, 
  Query, 
  Mutation, 
  Args, 
  Int, 
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  userById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => Int }) id: number,  @Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
