import { Module } from '@nestjs/common';
import { KeycloakController } from './keycloak.controller.js';
import { KeycloakService } from './keycloak.service.js';

@Module({
  imports: [],
  controllers: [KeycloakController],
  providers: [KeycloakService],
})
export class KeycloakModule {}
