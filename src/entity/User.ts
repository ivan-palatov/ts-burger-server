import bcrypt from 'bcryptjs';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
