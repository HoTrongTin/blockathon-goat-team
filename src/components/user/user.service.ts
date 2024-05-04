import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileDto } from './dto/profile.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async upsertUser(ownerAddress: string): Promise<UserEntity> {
    const existingUser = await this.usersRepository.findOne({ ownerAddress })
    if (existingUser) {
      return existingUser
    } else {
      const newUser = new UserEntity()
      newUser.ownerAddress = ownerAddress
      return this.usersRepository.save(newUser)
    }
  }

  async updateProfile(ownerAddress: string, data: ProfileDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ ownerAddress })
    if (!user) {
      throw new Error('User not found')
    }
    return this.usersRepository.save({ ...user, ...data })
  }
}
