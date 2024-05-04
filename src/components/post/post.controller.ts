import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { CustomAuthGuard } from '../auth/guard/custom-auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly authService: AuthService) {}

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
  async getPostById(@Request() req: Request, @Param('id') id: number) {
    try {
      const signature = req.headers['onchainsignature'] as string
      if (!signature) {
        throw new UnauthorizedException('Signature is required')
      }
      const walletAddress = this.authService.getAddressFromPersonalSignature(signature)
      return this.postService.getPostById(id, walletAddress)
    } catch (error) {
      return this.postService.getPostById(id)
    }
  }

  @UseGuards(CustomAuthGuard)
  @Post('/:id/view')
  async viewPost(@Request() req: Request, @Param('id') id: number) {
    const walletAddress = req['user'].walletAddress
    return this.postService.viewPost(walletAddress, id)
  }
}
