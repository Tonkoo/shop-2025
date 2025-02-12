import { Controller, Get } from '@nestjs/common';
import * as path from 'path';

@Controller('/test')
export class TodoController {
  @Get()
  getTest(): object {
    console.log(123123);
    console.log('Current working directory:', process.cwd());
    console.log('Current __dirname:', __dirname);
    console.log(
      'Resolved .env path:',
      path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '.env'),
    );
    return { message: process.env.TEST };
  }
}
