import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entities';
import type { Repository } from 'typeorm';
import type { SignInModel } from './model/sign-in.model';
import type { SignUpModel } from './model/sign-up.model';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepo!: Repository<UserEntity>;

  /**
   *
   * @description Creates a user
   */
  public async singUp(data: SignUpModel) {
    Logger.debug(data, AuthService.name);
    Logger.debug(`Password hash: ${data.passwordHash}`, AuthService.name);
    const user = await this.userRepo.save({
      age: data.age,
      name: data.name,
      email: data.email,
      password: data.passwordHash,
    });
    return user;
  }

  /**
   *
   * @description Finds and validates a user by its own email and password
   */
  public async singIn(data: SignInModel) {
    const user = await this.userRepo.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== data.passwordHash)
      throw new UnauthorizedException('Password is wrong, retry...');
    return user;
  }
}
