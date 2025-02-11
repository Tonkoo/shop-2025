import { Controller, Get } from '@nestjs/common';

@Controller('/test')
export class TodoController {
  @Get()
  getTest(): object {
    console.log(123123);
    return { message: 'Test1' };
  }
}
