import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! In Docker!';
  }

  getHello2(): string {
    return 'Hello World! In Docker!';
  }
}
