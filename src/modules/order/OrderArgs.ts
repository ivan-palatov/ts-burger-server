import { ArgsType, Field } from 'type-graphql';
import { Ingredient } from '../../entity/Ingredient';

@ArgsType()
export class OrderArgs {
  @Field(type => [Ingredient], { nullable: true })
  ingredients: Ingredient[];
}
