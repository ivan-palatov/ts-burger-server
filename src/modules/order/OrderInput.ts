import { IsIn, Max, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Ingredient } from '../../entity/Ingredient';

@InputType()
export class OrderInput {
  @Field(type => [Ingredient])
  ingredients: Ingredient[];

  @Field()
  @Min(6)
  @Max(255)
  address: string;

  @Field()
  @Min(6)
  @Max(15)
  phone: string;

  @Field()
  @IsIn(['courier', 'take out'])
  deliveryMethod: string;
}
