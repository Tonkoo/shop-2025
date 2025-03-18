import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class payLoad {
  //TODO: Использовать декораторы Пр: IsNotIn
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

  @IsString()
  searchName?: string;
}
