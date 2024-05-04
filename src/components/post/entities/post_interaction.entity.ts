import { InteractionType } from 'src/constants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post_interaction')
export class PostInteractionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  postId: number

  @Column({ nullable: false })
  ownerAddress: string

  @Column({ nullable: false })
  interactionType: InteractionType

  @Column({ nullable: false })
  claimed: boolean

  @Column({ nullable: false })
  createdAt: Date
}
