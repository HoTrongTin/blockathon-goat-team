import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(CustomAuthGuard)
  @Post()
  async createPost(@Request() req: Request, @Body() createPostDto: CreatePostDto) {
    const walletAddress = req['user'].walletAddress
    return this.postService.createPost(walletAddress, createPostDto)
  }

  @UseGuards(CustomAuthGuard)
  @Patch('/:id')
  async updatePost(@Param('id') id: number, @Request() req: Request, @Body() createPostDto: CreatePostDto) {
    const walletAddress = req['user'].walletAddress
    return this.postService.updatePost(walletAddress, id, createPostDto)
  }

  @UseGuards(CustomAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: number, @Request() req: Request) {
    const walletAddress = req['user'].walletAddress
    return this.postService.deletePost(walletAddress, id)
  }

  @Get('/:id')
  async getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id)
  }
}
