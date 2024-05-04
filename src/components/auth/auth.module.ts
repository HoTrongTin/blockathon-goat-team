import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CustomStrategy } from './strategy/custom.strategy'

@Module({
  imports: [PassportModule],
  providers: [AuthService, CustomStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService]
})
export class AuthModule {}
