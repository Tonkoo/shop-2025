import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class payLoad {
  @IsString({
    message: 'Параметр type должен быть типа string',
  })
  @IsNotEmpty()
  type: string;

  @IsNumber()
  from?: number;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsString({
    message: 'Параметр searchName должен быть типа string',
  })
  searchName?: string;
}
