import bcrypt from 'bcryptjs';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ default: '' })
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ default: '' })
  address: string;

  @Field()
  @Column({ default: 'courier' })
  deliveryMethod: string;

  @Field(type => [Order])
  @OneToMany(type => Order, order => order.user)
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
