import { Module } from '@nestjs/common'
import { RewardService } from './reward.service'
import { RewardController } from './reward.controller'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from '../post/entities/post.entity'
import { PostInteractionEntity } from '../post/entities/post_interaction.entity'
import { RewardEntity } from './entities/reward.entity'
import { AuthService } from '../auth/auth.service'
import { ReferralEntity } from '../user/entities/referral.entity'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([PostEntity, PostInteractionEntity, RewardEntity, ReferralEntity])],
  providers: [AuthService, RewardService],
  controllers: [RewardController],
  exports: [TypeOrmModule, RewardService]
})
export class RewardModule {}
