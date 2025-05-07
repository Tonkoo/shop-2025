import * as process from 'node:process';

export const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM || 'shop-admin',
  url:
    process.env.KEYCLOAK_URL ||
    'http://keycloak:8080/realms/shop-admin/protocol/openid-connect/token',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'shop-admin-client',
  secret:
    process.env.KEYCLOAK_CLIENT_SECRET || 'xX8RYq6OqRtwS19X021MT6Y4ZBMnMLSD',
};
