import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { introspectToken } from '@utils/introspectToken.util';
import { ResponseIntrospect } from '@interfaces/responseGlobal';
import type { Request } from 'express';

@Injectable()
export class KeycloakGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        return false;
      }

      const token = request.headers.authorization.split(' ')[1];

      const response: ResponseIntrospect = await introspectToken(token);
      return response.active;
    } catch (err) {
      return false;
    }
  }
}
