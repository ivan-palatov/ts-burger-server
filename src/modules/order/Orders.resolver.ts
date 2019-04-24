import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';
import { Ingredient } from '../../entity/Ingredient';
import { Order } from '../../entity/Order';
import { prices } from '../../entity/Price';
import { IContext } from '../../types/IContext';
import { OrderInput } from './OrderInput';

@Resolver()
export class OrdersResolver {
  @Query(returns => [Order], { nullable: true })
  @Authorized()
  async orders(@Ctx() { req }: IContext) {
    return await Order.find({
      where: { user: { id: req.session!.userId } },
      relations: ['ingredients'],
    });
  }

  @Mutation(returns => Boolean)
  @Authorized()
  async order(
    @Arg('data') { ingredients, address, phone, deliveryMethod, name }: OrderInput,
    @Ctx() { req }: IContext
  ) {
    try {
      const price = ingredients.reduce((acc, { name, amount }) => prices[name] * amount + acc, 0);
      const order = await Order.createQueryBuilder()
        .insert()
        .values({ user: { id: req.session!.userId }, price, address, phone, deliveryMethod, name })
        .execute();
      await createQueryBuilder(Ingredient)
        .insert()
        .values(ingredients.map(ing => ({ ...ing, order: order.identifiers[0] })))
        .execute();
      return true;
    } catch (e) {
      throw new ApolloError('bad request');
    }
  }
}
