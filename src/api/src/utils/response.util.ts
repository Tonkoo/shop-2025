import { ApiProperty } from '@nestjs/swagger';
import { Response, ResultItems } from './../interfaces/responseGlobal.js';

export class ResponseHelper {
  static createResponse(
    statusCode: number,
    data: object | number | undefined | ResultItems,
  ): Response {
    return {
      statusCode,
      data,
    };
  }
}

export class ResponseHelperApiCreated {
  @ApiProperty({
    example: '201',
  })
  statusCode: number;

  @ApiProperty({
    example: { id: 1, name: 'Тест 1' },
  })
  data: any;
}

export class ResponseHelperApiOK {
  @ApiProperty({
    example: '200',
  })
  statusCode: number;

  @ApiProperty({
    example: { id: 1, name: 'Тест 1' },
  })
  data: any;
}

export class ResponseHelperApiError {
  @ApiProperty({
    example: '400',
  })
  statusCode: number;

  @ApiProperty({
    example: { message: 'Ошибка: ...' },
  })
  data: any;
}
