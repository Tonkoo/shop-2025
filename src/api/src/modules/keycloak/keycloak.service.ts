import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from '@config/kc.config';
import { logger } from '@utils/logger/logger';
import { ResponseAdminKeycloak } from '@interfaces/responseGlobal';
import { introspectToken } from '@utils/introspectToken.util';

@Injectable()
export class KeycloakService {
  /**
   * Получает access_token для сервисного аккаунта (client credentials flow)
   */
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

  /**
   * Авторизует пользователя (password flow)
   * @param username - Логин пользователя
   * @param password - Пароль пользователя
   */
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

  /**
   * Разлогинивает пользователя в Keycloak
   * @param userId - ID пользователя в Keycloak
   */
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
      logger.error('Error from keycloak.logout: ', err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * Проверяет валидность токена
   * @param token - Токен для проверки
   */
  async introspect(token: string) {
    return await introspectToken(token);
  }

  /**
   * Обновляет токены авторизации по refresh token
   * @param token - Refresh token
   */
  async refreshToken(token: string) {
    try {
      const data = new URLSearchParams();
      data.append('client_id', keycloakConfig.clientId);
      data.append('client_secret', keycloakConfig.secret);
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', token);
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
      logger.error('Error from keycloak.refreshToken: ', err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
