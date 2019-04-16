import { ApolloError } from 'apollo-server-core';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { IContext } from '../../types/IContext';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(returns => User)
  async register(@Arg('data') { email, name, password }: RegisterInput, @Ctx() { req }: IContext) {
    try {
      const user = await User.create({ name, email, password }).save();
      req.session!.userId = user.id;
      return user;
    } catch {
      throw new ApolloError('Something went wrong');
    }
  }
}
