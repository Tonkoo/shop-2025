import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { KeycloakService } from '@modules/keycloak/keycloak.service';

@Controller('auth')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const token = await this.keycloakService.login(
      body.username,
      body.password,
    );

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return res.redirect('/admin');
  }
}
