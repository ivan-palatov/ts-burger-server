import { IsIn, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Ingredient } from '../../entity/Ingredient';

@InputType()
export class OrderInput {
  @Field(type => [Ingredient])
  ingredients: Ingredient[];

  @Field()
  @Length(6, 255)
  address: string;

  @Field()
  @Length(6, 15)
  phone: string;

  @Field()
  @IsIn(['courier', 'take out'])
  deliveryMethod: string;
}
