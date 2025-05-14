import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from '@config/kc.config';

@Injectable()
export class KeycloakGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const data = new URLSearchParams();
      data.append('token', request.cookies?.access_token);
      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      const response = await axios.post<{ active: boolean }>(
        `${keycloakConfig.url}/token/introspect`,
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data.active;
    } catch (err) {
      return false;
    }
  }
}
