import { Controller, Post, Query, Request, UseGuards } from '@nestjs/common'
import { InteractionType } from 'src/constants'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { RewardService } from './reward.service'

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @UseGuards(CustomAuthGuard)
  @Post('/claim')
  async claimReward(@Request() req: Request, @Query('type') type: InteractionType, @Query('postId') postId?: number) {
    const walletAddress = req['user'].walletAddress
    return this.rewardService.sendReward(walletAddress, type, postId)
  }
}
