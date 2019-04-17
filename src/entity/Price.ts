import { Field, Float, ObjectType } from 'type-graphql';

interface IPrice {
  [x: string]: number;
}

// It could be a typeorm entity, but its a simple example w/o admin management and stuff, so just an object
@ObjectType()
export class Price {
  @Field(type => Float)
  cheese: number = 1;

  @Field(type => Float)
  salad: number = 0.5;

  @Field(type => Float)
  bacon: number = 1;

  @Field(type => Float)
  meat: number = 2;
}

export const prices: IPrice = {
  cheese: 1,
  salad: 0.5,
  bacon: 1,
  meat: 2,
};
