import { IsIn, Max, Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@ObjectType()
@InputType('ing')
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsIn(['bacon', 'meat', 'cheese', 'salad'])
  @Column()
  name: string;

  @Field(type => Int)
  @Min(0)
  @Max(10)
  @Column('int')
  amount: number;

  @ManyToOne(type => Order, order => order.ingredients)
  order: Order;
}
