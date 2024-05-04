import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  ownerAddress: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: false })
  isPublic: boolean

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date
}
