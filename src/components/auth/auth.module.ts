import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CustomStrategy } from './strategy/custom.strategy'
import { UserService } from '../user/user.service'
import { UserEntity } from '../user/entities/user.entity'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserService, CustomStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService, UserService]
})
export class AuthModule {}
