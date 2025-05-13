import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from './../../config/kc.config.js';
import { logger } from './../../utils/logger/logger.js';

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

  async logout(userId: string, accessToken: string) {
    try {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJEbzVDXzQyRjlHUnNTcUFLSDdLTE42ci1wQ2JBNWY4UlgyWUhpalFFTmNBIn0.eyJleHAiOjE3NDcxMzQwMTMsImlhdCI6MTc0NzEzMzcxMywianRpIjoidHJydGNjOjZhNjBkYzM3LWMwNjUtNDcwNy05MzlmLTE1ZDNlZWFiZGM0YSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvc2hvcC1hZG1pbiIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJmZDFjNTYzNC1hOTM0LTRkZTEtODgwYi0zZGYxZmY0NGMzMjQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaG9wLWFkbWluLWNsaWVudCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtc2hvcC1hZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyJdfSwic2hvcC1hZG1pbi1jbGllbnQiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4xOC4wLjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc2hvcC1hZG1pbi1jbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjE4LjAuMSIsImNsaWVudF9pZCI6InNob3AtYWRtaW4tY2xpZW50In0.kl9g8GVVXxdzsKj-cq0DZyNOeuA09OYUY-tKqhJ-Xl1HKqRERB9fHADwEpCGhyjdCTEF0Xo3GsE5QxgQPXEuRml0NQkVqJyUVZY8F_PWfv2GY0WItugCkAevX1cNI2aFpie77wuIziAe9DXXVSZzoajVctqYKEx1WT8OZALA6VbSsyzcawy2WttYqQ_yZUyybMy1a4HIqKrNc5OeQo6cYRXMhUNUd1pjdsCK-GGJc2YIldH6-rRLnpqPZodU5nP_sVgKglW8q83tliZ0ZR_wSyHub8qHzQNe56jb00SlaJ8Orm1hNJkuHbf1YETFeUIkCi-dYzeChoc8eMIgqoaY1Q';
      const response = await axios.post(
        `http://keycloak:8080/admin/realms/${keycloakConfig.realm}/users/${userId}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer ${accessToken}`,
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
}
