import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class HelloResponse {
  @ApiProperty({
    example: 'Hello World!',
    description: 'Приветственное сообщение от сервера',
  })
  message: string;
}

@Controller()
@ApiTags('Default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Получить приветственное сообщение' })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ с приветственным сообщением',
    type: HelloResponse,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
