import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from '@config/kc.config';
import { logger } from '@utils/logger/logger';
import { ResponseAdminKeycloak } from '@interfaces/responseGlobal';

@Injectable()
export class KeycloakService {
  async getToken() {
    try {
      const data = new URLSearchParams();
      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      data.append('grant_type', 'client_credentials');
      const response = await axios.post<ResponseAdminKeycloak>(
        `${keycloakConfig.url}/token`,
        data.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data.access_token;
    } catch (err) {
      logger.error('Error from keycloak.getToken: ', err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(username: string, password: string) {
    try {
      const data = new URLSearchParams();
      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      data.append('grant_type', 'password');
      data.append('username', username);
      data.append('password', password);
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
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logout(userId: string) {
    try {
      const token = await this.getToken();
      const response = await axios.post(
        `http://keycloak:8080/admin/realms/${keycloakConfig.realm}/users/${userId}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (err) {
      logger.error('Error from keycloak.login: ', err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
