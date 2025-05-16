import { Body, Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Response, Request } from 'express';
import { KeycloakService } from '@modules/keycloak/keycloak.service';

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
    res.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: token.refresh_expires_in * 1000,
    });
    return {
      success: true,
      access_token: token.access_token,
      expires_in: token.expires_in,
    };
  }
  @Post('logout')
  async logout(
    @Body() body: { userId: string },
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    await this.keycloakService.logout(body.userId);

    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 0,
    });
    return { success: true };
  }

  @Post('introspect')
  async introspect(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader.split(' ')[1];

    return await this.keycloakService.introspect(token);
  }

  @Post('refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const newToken = await this.keycloakService.refreshToken(
      req.cookies?.refresh_token,
    );
    res.cookie('refresh_token', newToken.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: newToken.refresh_expires_in * 1000,
    });
    return {
      success: true,
      access_token: newToken.access_token,
      expires_in: newToken.expires_in,
    };
  }
}
