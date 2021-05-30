import { IsEmail } from 'class-validator';

export class UserUpdateDto {
  first_name?: string;
  last_name?: string;
  @IsEmail()
  email?: string;
}
