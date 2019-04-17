import { Query, Resolver } from 'type-graphql';
import { Price, prices } from '../../entity/Price';

@Resolver()
export class PriceResolver {
  @Query(returns => Price)
  getPrices() {
    return prices;
  }
}
