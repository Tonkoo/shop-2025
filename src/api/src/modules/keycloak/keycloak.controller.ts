import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { KeycloakService } from '@modules/keycloak/keycloak.service';
import { keycloakConfig } from '@config/kc.config';

@Controller('auth')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.keycloakService.login(
      body.username,
      body.password,
    );

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: token.expires_in * 1000,
    });
    return {
      success: true,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
    };
  }
  @Post('logout')
  async logout(@Res() res: Response, @Req() request: Request) {
    const accessToken = request.cookies?.access_token;
    if (!accessToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return await this.keycloakService.logout(accessToken);
  }
}
