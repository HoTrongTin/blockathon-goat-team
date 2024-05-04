import { Injectable } from '@nestjs/common'
import { RewardEntity } from './entities/reward.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PostInteractionEntity } from '../post/entities/post_interaction.entity'
import { InteractionType } from 'src/constants'
import { PostEntity } from '../post/entities/post.entity'
import goatABI from 'src/abi/goat.abi'
import Web3 from 'web3'

@Injectable()
export class RewardService {
  private readonly rpcEndpoint = 'https://rpc2.sepolia.org' // RPC endpoint
  private readonly web3 = new Web3(new Web3.providers.HttpProvider(this.rpcEndpoint))

  constructor(
    @InjectRepository(RewardEntity)
    private rewardsRepository: Repository<RewardEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostInteractionEntity)
    private postInteractionRepository: Repository<PostInteractionEntity>
  ) {}

  // async claimReward(ownerAddress: string, type: InteractionType): Promise<void> {
  //   if (type === InteractionType.view) {
  //     // Get total viewed interaction of post of this ownerAddress
  //     const query = await this.postInteractionRepository.query(
  //       `
  //       SELECT COUNT(*) as totalViewed
  //       FROM
  //         post_interaction
  //         JOIN post ON post_interaction.postId = post.id
  //       WHERE post.ownerAddress = '${ownerAddress}'
  //         AND post_interaction.interactionType = '${InteractionType.view}'`
  //     )

  //     const totalViewed = query[0].totalViewed
  //     console.log('totalViewed: ', totalViewed)
  //   }
  // }

  async sendReward(ownerAddress: string, postId: number, type: InteractionType): Promise<void> {
    console.log('postId: ', postId)
    const contractAddress = '0xA2b34213723B019Aec1695A7c2a21539AAeABA54'
    const privateKey = '0x1c68e3ec2ac9a83afb584b6de504aee5990b5ac90f1f9cf0aa1a78e521c3a5c7'
    this.web3.eth.accounts.wallet.add(privateKey)
    const fromAccount = this.web3.eth.accounts.wallet[0].address
    const contract = new this.web3.eth.Contract(goatABI, contractAddress)

    if (type === InteractionType.view) {
      // Get total viewed interaction of post of this ownerAddress
      const query = await this.postInteractionRepository.query(
        `
        SELECT COUNT(*) as totalViewed 
        FROM 
          post_interaction 
          JOIN post ON post_interaction.postId = post.id 
        WHERE
          post.id = ${postId}
          AND post.ownerAddress = '${ownerAddress}' 
          AND post_interaction.claimed = 0
          AND post_interaction.interactionType = '${InteractionType.view}'`
      )

      const totalViewed = query[0].totalViewed
      console.log('totalViewed: ', totalViewed)
      if (totalViewed === 0) {
        return
      }

      const viewConfig = [1, 10, 20, 50]
      const rewardConfig = [1, 5, 10, 20]

      let amount = 0
      if (totalViewed <= 50) {
        amount = rewardConfig[0]
        let index = 0
        while (totalViewed >= viewConfig[index]) {
          console.log('totalViewed: ', totalViewed, 'viewConfig[index]: ', viewConfig[index])
          amount = rewardConfig[index]
          index++
        }
      } else {
        amount = 10 + Math.floor(totalViewed / 50) * 10
      }

      // Send reward to ownerAddress
      console.log('amount: ', amount)
      const wei = this.web3.utils.toWei(amount, 'ether')
      const response = await contract.methods.transfer(ownerAddress, wei).send({ from: fromAccount })
      console.log('response: ', response)

      // Save reward to database
      const reward = new RewardEntity()
      reward.ownerAddress = ownerAddress
      reward.interactionCount = totalViewed
      reward.rewardAmount = amount
      reward.rewardType = type
      reward.transactionHash = response.transactionHash
      const savedReward = await this.rewardsRepository.save(reward)
      console.log('savedReward: ', savedReward)

      // Update post_interaction
      await this.postInteractionRepository.update({ postId, ownerAddress, interactionType: type }, { claimed: true })
    }
  }
}
