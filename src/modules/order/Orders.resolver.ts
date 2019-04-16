import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';
import { IContext } from '../../types/IContext';

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
}
