import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { AuthService } from '../auth.service'
import { UserService } from 'src/components/user/user.service'

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  static key = 'custom'

  constructor(private authService: AuthService, private userService: UserService) {
    super()
  }

  async validate(req: Request): Promise<any> {
    const signature = req.headers['onchainsignature'] as string
    if (!signature) {
      throw new UnauthorizedException('Signature is required')
    }
    const walletAddress = this.authService.getAddressFromPersonalSignature(signature)
    console.log('walletAddress: ', walletAddress)
    this.userService.upsertUser(walletAddress)
    req['walletAddress'] = walletAddress
    return {
      walletAddress
    }
  }
}
