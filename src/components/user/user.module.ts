import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from '../auth/auth.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from './entities/user.entity'
import { ReferralEntity } from './entities/referral.entity'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity, ReferralEntity])],
  providers: [AuthService, UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
