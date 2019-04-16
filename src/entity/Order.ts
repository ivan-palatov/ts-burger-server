import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './Ingredient';
import { User } from './User';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column('date')
  date: Date;

  @Field(type => Int)
  @Column('int')
  price: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.orders)
  user: User;

  @Field(type => [Ingredient])
  @OneToMany(type => Ingredient, ingredient => ingredient.order)
  ingredients: Ingredient[];
}
