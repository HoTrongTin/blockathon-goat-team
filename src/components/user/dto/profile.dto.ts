import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Gender } from 'src/constants'

export class ProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender: Gender

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dob?: Date
}
