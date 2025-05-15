import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { introspectToken } from '@utils/introspectToken.util';
import { ResponseIntrospect } from '@interfaces/responseGlobal';

@Injectable()
export class KeycloakGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.cookies?.access_token) {
        return false;
      }

      const response: ResponseIntrospect = await introspectToken(
        request.cookies.access_token,
      );
      return response.active;
    } catch (err) {
      return false;
    }
  }
}
