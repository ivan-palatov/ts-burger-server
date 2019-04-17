import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../../entity/User';
import { isEmailAlreadyUsed } from './isEmailAlreadyUsed';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsEmail()
  @isEmailAlreadyUsed()
  email: string;

  @Field()
  @Length(6, 75)
  password: string;
}
