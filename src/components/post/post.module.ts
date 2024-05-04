import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from './entities/post.entity'
import { PostInteractionEntity } from './entities/post_interaction.entity'
import { PostAssetEntity } from './entities/post_asset.entity'
import { AuthService } from '../auth/auth.service'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([PostEntity, PostInteractionEntity, PostAssetEntity])],
  providers: [AuthService, PostService],
  controllers: [PostController],
  exports: [TypeOrmModule, PostService]
})
export class PostModule {}
