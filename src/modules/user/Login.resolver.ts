import { UserInputError } from 'apollo-server-core';
import bcrypt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { IContext } from '../../types/IContext';
import { LoginInput } from './login/LoginInput';

@Resolver()
export class LoginResolver {
  @Mutation(returns => User)
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() { req }: IContext
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UserInputError('Invalid email or password');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UserInputError('Invalid email or password');
    }
    req.session!.userId = user.id;
    return user;
  }
}
