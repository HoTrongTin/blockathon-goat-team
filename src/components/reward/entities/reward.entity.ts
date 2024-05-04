import { InteractionType } from 'src/constants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('reward')
export class RewardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  ownerAddress: string

  @Column({ nullable: false })
  interactionCount: number

  @Column({ nullable: false })
  rewardAmount: number

  @Column({ nullable: false })
  rewardType: InteractionType

  @Column({ nullable: false })
  transactionHash: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date
}
