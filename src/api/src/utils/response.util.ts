import { ApiProperty } from '@nestjs/swagger';

export class ResponseHelper {
  static createResponse(statusCode: number, data: any) {
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
    example: { id: 1, name: 'Тест 1' },
  })
  data: any;
}
