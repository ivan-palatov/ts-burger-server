import { ApolloError } from 'apollo-server-core';
import { Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';
import { Ingredient } from '../../entity/Ingredient';
import { Order } from '../../entity/Order';
import { Price } from '../../entity/Price';
import { IContext } from '../../types/IContext';
import { OrderArgs } from './OrderArgs';

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
  async order(@Args() { ingredients }: OrderArgs, @Ctx() { req }: IContext) {
    try {
      const price = ingredients.reduce((acc, { name, amount }) => Price[name] * amount + acc, 0);
      const res = await Order.createQueryBuilder()
        .insert()
        .values({ user: { id: req.session!.userId }, price })
        .execute();
      await createQueryBuilder(Ingredient)
        .insert()
        .values(ingredients.map(ing => ({ ...ing, order: res.identifiers[0] })))
        .execute();
      return true;
    } catch (e) {
      throw new ApolloError('bad request');
    }
  }
}
