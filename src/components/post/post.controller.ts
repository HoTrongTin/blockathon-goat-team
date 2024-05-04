import { Body, Controller, Post, UseGuards, Request, Get, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { CreatePostDto } from './dto/create-post.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(CustomAuthGuard)
  @Post()
  async createPost(@Request() req: Request, @Body() createPostDto: CreatePostDto) {
    const walletAddress = req['user'].walletAddress
    return this.postService.createPost(walletAddress, createPostDto)
  }

  @Get('/:id')
  async getPostById(@Query('id') id: number) {
    return this.postService.getPostById(id)
  }
}
