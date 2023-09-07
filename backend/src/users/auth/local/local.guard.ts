import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class LocalGuard extends PassportStrategy(Strategy) {
  constructor(private authService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const payload = await this.authService.validateUser(username, password);
    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return payload;
  }
}
