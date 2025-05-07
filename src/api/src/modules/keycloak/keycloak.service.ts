import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { keycloakConfig } from '@config/kc.config';

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
      console.log(data);
      const response = await axios.post(keycloakConfig.url, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
