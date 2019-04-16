import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@ObjectType()
@Entity()
export class Ingredient {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => Int)
  @Column('int')
  amount: number;

  @ManyToOne(type => Order, order => order.ingredients)
  order: Order;
}
