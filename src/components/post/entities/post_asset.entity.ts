import { AssetType } from 'src/constants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post_asset')
export class PostAssetEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  postId: number

  @Column({ nullable: false })
  assetType: AssetType

  @Column({ nullable: false })
  assetValue: string
}
