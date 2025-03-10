import { ApiProperty } from '@nestjs/swagger';
import { response, resultItems } from '../interfaces/global';

export class ResponseHelper {
  static createResponse(
    statusCode: number,
    data: object | number | undefined | resultItems,
  ): response {
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
