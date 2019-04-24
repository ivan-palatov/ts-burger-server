import { IsIn, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class EditUserInput {
  @Field()
  @Length(4, 200)
  name: string;

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
