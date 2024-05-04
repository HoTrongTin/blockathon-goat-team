import { Injectable } from '@nestjs/common'
import { RewardEntity } from './entities/reward.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PostInteractionEntity } from '../post/entities/post_interaction.entity'
import { InteractionType } from 'src/constants'
import { PostEntity } from '../post/entities/post.entity'

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(RewardEntity)
    private rewardsRepository: Repository<RewardEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostInteractionEntity)
    private postInteractionRepository: Repository<PostInteractionEntity>
  ) {}

  async claimReward(ownerAddress: string, type: InteractionType): Promise<void> {
    if (type === InteractionType.view) {
      // Get total viewed interaction of post of this ownerAddress
      const query = await this.postInteractionRepository.query(
        `
        SELECT COUNT(*) as totalViewed 
        FROM 
          post_interaction 
          JOIN post ON post_interaction.postId = post.id 
        WHERE post.ownerAddress = '${ownerAddress}' 
          AND post_interaction.interactionType = '${InteractionType.view}'`
      )

      const totalViewed = query[0].totalViewed
      console.log('totalViewed: ', totalViewed)
    }
  }
}
