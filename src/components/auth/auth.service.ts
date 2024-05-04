import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { Injectable } from '@nestjs/common'
import { PERSONAL_SIGN_CHALLENGE } from 'src/constants'

@Injectable()
export class AuthService {
  public getPersonalSignChallenge() {
    return {
      challenge: PERSONAL_SIGN_CHALLENGE
    }
  }

  public getAddressFromPersonalSignature(signature: string): string {
    const address = recoverPersonalSignature({ signature, data: PERSONAL_SIGN_CHALLENGE })
    return address
  }
}
