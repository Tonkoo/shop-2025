import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';

class TestResponse {
  @ApiProperty({
    example: 'Hello from backend!',
    description: 'Сообщение от сервера',
  })
  message: string;
}

@Controller('/test')
@ApiTags('test')
export class TodoController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: TestResponse,
  })
  getTest(): object {
    return { message: process.env.DB_NAME };
  }
}
