import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from '@config/kc.config';
import { logger } from '@utils/logger/logger';

@Injectable()
export class KeycloakService {
  async login(username: string, password: string) {
    try {
      const data = new URLSearchParams();
      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      data.append('grant_type', 'password');
      data.append('username', username);
      data.append('password', password);

      // console.log(`${keycloakConfig.url}/token`);

      const response = await axios.post(
        `${keycloakConfig.url}/token`,
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (err) {
      logger.error('Error from keycloak.login: ', err);
      console.log(err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async logout(accessToken: string) {
    try {
      const data = new URLSearchParams();

      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      // data.append('access_token', accessToken);
      // data.append('post_logout_redirect_uri', 'http://localhost/');
      const response = await axios.post(
        `${keycloakConfig.url}/logout`,
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return { success: true };
    } catch (err) {
      logger.error('Error from keycloak.logout: ', err);
      throw new UnauthorizedException('Logout failed');
    }
  }
}
