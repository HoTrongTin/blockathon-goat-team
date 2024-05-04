import { Gender } from 'src/constants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('referral')
export class ReferralEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: false })
  referrerAddress: string

  @Column({ nullable: false })
  refereeAddress: string

  @Column({ nullable: false })
  claimed: boolean

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
