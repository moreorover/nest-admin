import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async userId(request: Request): Promise<string> {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    return data['id'];
  }
}
