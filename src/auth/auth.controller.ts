import { LoginDto } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }
    const hashedPassword = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.userService.findOne({ email: body.email });

    if (!user) {
      throw new BadRequestException('No user with this email!');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Incorrect password!');
    }

    return user;
  }
}
