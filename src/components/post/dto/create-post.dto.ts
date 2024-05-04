import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[]

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  videos: string[]

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  whitelistAddresses: string[]
}
