import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [JwtModule],
})
export class CommonModule {}
