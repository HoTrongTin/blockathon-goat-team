import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { AuthService } from '../auth.service'

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  static key = 'custom'

  constructor(private authService: AuthService) {
    super()
  }

  async validate(req: Request): Promise<any> {
    console.log('CustomStrategy.validate', req)
  }
}
