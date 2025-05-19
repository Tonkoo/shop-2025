import { keycloakConfig } from '@config/kc.config';
import axios from 'axios';
import { logger } from '@utils/logger/logger';
import type { ResponseIntrospect } from '@interfaces/responseGlobal';

/**
 * Проверяет валидность токена через Keycloak
 * @param token - Токен для проверки
 */
export async function introspectToken(
  token: string,
): Promise<ResponseIntrospect> {
  try {
    const data = new URLSearchParams();
    data.append('token', token);
    data.append('client_id', keycloakConfig.clientId);
    data.append('client_secret', keycloakConfig.secret);
    const response = await axios.post<ResponseIntrospect>(
      `${keycloakConfig.url}/token/introspect`,
      data.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  } catch (err) {
    logger.error('Error from introspectToken.util.introspectToken: ', err);
    throw err;
  }
}
