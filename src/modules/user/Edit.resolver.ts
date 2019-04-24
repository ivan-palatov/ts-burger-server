import { UserInputError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { IContext } from '../../types/IContext';
import { EditUserInput } from './edit/EditUserInput';

@Resolver()
export class EditUserResolver {
  @Authorized()
  @Mutation(returns => Boolean)
  async editUser(
    @Arg('data') { address, deliveryMethod, name, phone }: EditUserInput,
    @Ctx() { req }: IContext
  ): Promise<Boolean> {
    try {
      await User.createQueryBuilder()
        .update({ address, deliveryMethod, phone, name })
        .where('id = :id', { id: req.session!.userId })
        .execute();
      return true;
    } catch (e) {
      throw new UserInputError('bad request');
    }
  }
}
