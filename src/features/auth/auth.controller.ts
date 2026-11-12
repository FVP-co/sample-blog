import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { CredentialsService } from 'src/infra/credentials/credentials.service';
import { TokenModel } from 'src/infra/credentials/models/token.model';
import { AuthModel } from './model/auth.model';
import { SignInModel } from './model/sign-in.model';
import { SignUpModel } from './model/sign-up.model';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,

    @Inject(CredentialsService)
    private readonly credentialsService: CredentialsService,
  ) {}

  @Post('sign-in')
  @ApiResponse({
    type: AuthModel,
    status: HttpStatus.CREATED,
  })
  public async signIn(@Body() data: SignInModel): Promise<AuthModel> {
    const signedInUser = await this.authService.singIn(data);
    const token = this.credentialsService.generateToken(
      TokenModel.fromUserEntity(signedInUser),
    );
    return new AuthModel(signedInUser, token);
  }

  @Post('sign-up')
  @ApiResponse({
    type: AuthModel,
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() data: SignUpModel): Promise<AuthModel> {
    const signedInUser = await this.authService.singUp(data);
    const token = this.credentialsService.generateToken(
      TokenModel.fromUserEntity(signedInUser),
    );
    return new AuthModel(signedInUser, token);
  }
}
