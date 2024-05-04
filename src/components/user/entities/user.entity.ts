import { Gender } from 'src/constants'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  ownerAddress: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  avatar?: string

  @Column({ nullable: true })
  bio?: string

  @Column({ nullable: true })
  gender: Gender

  @Column({ nullable: true })
  dob?: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date
}
