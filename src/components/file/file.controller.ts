import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, Get, Param, Res, NotFoundException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { FileService } from './file.service'
import { Response } from 'express'
import * as path from 'path'
import * as fs from 'fs'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload', // Current directory. Make sure your process has write permissions here.
        filename: (req, file, cb) => {
          // You could also use the original file name or generate a new one
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, `${uniqueSuffix}-${file.originalname}`)
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST)
    }

    // The response could be adjusted as per your requirements
    return {
      message: 'File uploaded successfully',
      filename: file.filename
    }
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.resolve('./upload', filename) // Ensure this points to your file storage directory

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File does not exist!')
    }

    res.sendFile(filePath)
  }
}
