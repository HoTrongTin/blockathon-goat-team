import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CustomAuthGuard } from './guard/custom-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/personal-sign-challenge')
  async getPersonalSignChallenge() {
    return this.authService.getPersonalSignChallenge()
  }

  @UseGuards(CustomAuthGuard)
  @Get('/test-auth')
  async testAuth(@Request() req: Request) {
    console.log('user: ', req['user'])
    return req['user']
  }
}
