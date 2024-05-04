import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity } from './entities/post.entity'
import { PostInteractionEntity } from './entities/post_interaction.entity'
import { PostAssetEntity } from './entities/post_asset.entity'
import { AssetType, InteractionType } from 'src/constants'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostInteractionEntity)
    private postInteractionRepository: Repository<PostInteractionEntity>,
    @InjectRepository(PostAssetEntity)
    private postAssetRepository: Repository<PostAssetEntity>
  ) {}

  async createPost(
    ownerAddress: string,
    data: CreatePostDto
  ): Promise<{
    post: PostEntity
    images: string[]
    videos: string[]
    whitelistAddresses: string[]
  }> {
    const post = new PostEntity()
    post.ownerAddress = ownerAddress
    post.name = data.name
    post.description = data.description
    post.isPublic = data.isPublic
    const newPost = await this.postRepository.save(post)

    if (data.images) {
      for (const image of data.images) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = newPost.id
        postAsset.assetType = AssetType.image
        postAsset.assetValue = image
        await this.postAssetRepository.save(postAsset)
      }
    }

    if (data.videos) {
      for (const video of data.videos) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = newPost.id
        postAsset.assetType = AssetType.video
        postAsset.assetValue = video
        await this.postAssetRepository.save(postAsset)
      }
    }

    if (data.whitelistAddresses) {
      for (const address of data.whitelistAddresses) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = newPost.id
        postAsset.assetType = AssetType.whitelistAddress
        postAsset.assetValue = address
        await this.postAssetRepository.save(postAsset)
      }
    }

    return this.getPostById(newPost.id)
  }

  async updatePost(walletAddress: any, id: number, data: CreatePostDto) {
    const post = await this.postRepository.findOne({ id })
    if (!post || post.ownerAddress !== walletAddress) {
      throw new Error('Post not found')
    }

    post.name = data.name
    post.description = data.description
    post.isPublic = data.isPublic
    await this.postRepository.save(post)

    await this.postAssetRepository.delete({ postId: id })

    if (data.images) {
      for (const image of data.images) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = id
        postAsset.assetType = AssetType.image
        postAsset.assetValue = image
        await this.postAssetRepository.save(postAsset)
      }
    }

    if (data.videos) {
      for (const video of data.videos) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = id
        postAsset.assetType = AssetType.video
        postAsset.assetValue = video
        await this.postAssetRepository.save(postAsset)
      }
    }

    if (data.whitelistAddresses) {
      for (const address of data.whitelistAddresses) {
        const postAsset = new PostAssetEntity()
        postAsset.postId = id
        postAsset.assetType = AssetType.whitelistAddress
        postAsset.assetValue = address
        await this.postAssetRepository.save(postAsset)
      }
    }

    return this.getPostById(id)
  }

  async deletePost(walletAddress: any, id: number) {
    const post = await this.postRepository.findOne({ id })
    if (!post || post.ownerAddress !== walletAddress) {
      throw new Error('Post not found')
    }

    await this.postRepository.delete({ id })
    await this.postAssetRepository.delete({ postId: id })

    return { message: 'Post deleted successfully' }
  }

  async getPostById(postId: number): Promise<{
    post: PostEntity
    images: string[]
    videos: string[]
    whitelistAddresses: string[]
  }> {
    console.log('postId: ', postId)
    const post = await this.postRepository.findOne({ id: postId })
    console.log('post: ', post)

    const postAssets = await this.postAssetRepository.find({ postId })
    const images = postAssets.filter(asset => asset.assetType === AssetType.image).map(asset => asset.assetValue)
    const videos = postAssets.filter(asset => asset.assetType === AssetType.video).map(asset => asset.assetValue)
    const whitelistAddresses = postAssets.filter(asset => asset.assetType === AssetType.whitelistAddress).map(asset => asset.assetValue)

    return { post, images, videos, whitelistAddresses }
  }

  async viewPost(walletAddress: any, id: number) {
    const post = await this.postRepository.findOne({ id })
    if (!post) {
      throw new Error('Post not found')
    }

    const postInteraction = new PostInteractionEntity()
    postInteraction.postId = id
    postInteraction.ownerAddress = walletAddress
    postInteraction.interactionType = InteractionType.view

    await this.postInteractionRepository.save(postInteraction)
  }
}
