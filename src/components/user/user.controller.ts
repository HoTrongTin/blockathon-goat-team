import { Body, Controller, Patch, UseGuards, Request, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { ProfileDto } from './dto/profile.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(CustomAuthGuard)
  @Patch('/profile')
  async updateProfile(@Request() req: Request, @Body() data: ProfileDto) {
    const walletAddress = req['user'].walletAddress
    return this.userService.updateProfile(walletAddress, data)
  }

  @UseGuards(CustomAuthGuard)
  @Get('/profile/me')
  async getProfile(@Request() req: Request) {
    const walletAddress = req['user'].walletAddress
    return this.userService.getProfile(walletAddress)
  }

  @UseGuards(CustomAuthGuard)
  @Post('/referral')
  async addReferral(
    @Request() req: Request,
    @Body()
    data: {
      referrerAddress: string
    }
  ) {
    const walletAddress = req['user'].walletAddress
    return this.userService.addReferral(walletAddress, data.referrerAddress)
  }
}
