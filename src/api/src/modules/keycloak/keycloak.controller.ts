import { Body, Controller, Post, Req, Res } from '@nestjs/common';
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
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: token.expires_in * 1000,
    });
    res.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: token.refresh_expires_in * 1000,
    });
    return {
      success: true,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
    };
  }
  @Post('logout')
  async logout(
    @Body() body: { userId: string },
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.keycloakService.logout(body.userId);
  }

  @Post('introspect')
  async introspect(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    if (!req.cookies?.access_token) {
      return { active: false };
    }

    return await this.keycloakService.introspect(req.cookies.access_token);
  }

  @Post('refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    console.log(req.cookies?.refresh_token);
    const newToken = await this.keycloakService.refreshToken(
      req.cookies?.refresh_token,
    );
    res.cookie('access_token', newToken.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: newToken.expires_in * 1000,
    });
    res.cookie('refresh_token', newToken.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: newToken.refresh_expires_in * 1000,
    });
    // res.cookie('access_token', token.access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   maxAge: token.expires_in * 1000,
    // });
    // res.cookie('refresh_token', token.refresh_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   maxAge: token.refresh_expires_in * 1000,
    // });
    return {
      success: true,
      access_token: newToken.access_token,
      refresh_token: newToken.refresh_token,
      expires_in: newToken.expires_in,
    };
  }
}
