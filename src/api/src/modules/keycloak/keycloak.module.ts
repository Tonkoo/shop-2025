import { Module } from '@nestjs/common';
import { KeycloakController } from '@modules/keycloak/keycloak.controller';
import { KeycloakService } from '@modules/keycloak/keycloak.service';

@Module({
  imports: [],
  controllers: [KeycloakController],
  providers: [KeycloakService],
})
export class KeycloakModule {}
