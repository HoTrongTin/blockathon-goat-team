import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common'
import { InteractionType } from 'src/constants'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { RewardService } from './reward.service'

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @UseGuards(CustomAuthGuard)
  @Post('/claim/:type')
  async claimReward(@Request() req: Request, @Param('type') type: InteractionType) {
    const walletAddress = req['user'].walletAddress
    return this.rewardService.claimReward(walletAddress, type)
  }
}
