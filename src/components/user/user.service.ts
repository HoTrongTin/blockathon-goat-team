import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileDto } from './dto/profile.dto'
import { ReferralEntity } from './entities/referral.entity'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ReferralEntity)
    private referralRepository: Repository<ReferralEntity>
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

  async getProfile(walletAddress: any) {
    return this.usersRepository.findOne({ ownerAddress: walletAddress })
  }

  async addReferral(walletAddress: any, referrerAddress: string) {
    const existingReferral = await this.referralRepository.findOne({
      referrerAddress,
      refereeAddress: walletAddress
    })

    const existingReferee = await this.referralRepository.findOne({
      referrerAddress: walletAddress,
      refereeAddress: referrerAddress
    })

    const referrer = await this.usersRepository.findOne({ ownerAddress: referrerAddress })

    if (existingReferral || existingReferee || !referrer) {
      throw new HttpException('Invalid referral address', HttpStatus.BAD_REQUEST)
    }
    const newReferral = new ReferralEntity()
    newReferral.referrerAddress = referrerAddress
    newReferral.refereeAddress = walletAddress
    newReferral.claimed = false
    return this.referralRepository.save(newReferral)
  }
}
