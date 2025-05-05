import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class payLoad {
  @IsString({
    message: 'Параметр type должен быть типа string',
  })
  @IsNotEmpty()
  type?: string;

  @IsNumber({}, { message: 'Параметр from должен быть типа number' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  from?: number;

  @IsNumber({}, { message: 'Параметр size должен быть типа number' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  size?: number;

  @IsString({
    message: 'Параметр searchName должен быть типа string',
  })
  searchName?: string;

  @IsNumber({}, { message: 'Параметр filterSection должен быть типа number' })
  @IsOptional()
  filterSection?: number;

  @IsString({
    message: 'Параметр typeForm должен быть типа string',
  })
  @IsOptional()
  typeForm?: string;

  @IsBoolean({ message: 'Параметр getItems должен быть типа boolean' })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getItems?: boolean;
}

export class ParamsCatalog {
  @IsString({
    message: 'Параметр url должен быть типа string',
  })
  @IsNotEmpty()
  url: string;

  @IsString({
    message: 'Параметр url должен быть типа string',
  })
  @IsNotEmpty()
  filter: string;

  @IsBoolean({ message: 'Параметр layout должен быть типа boolean' })
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  layout: boolean;

  @IsBoolean({ message: 'Параметр isFilter должен быть типа boolean' })
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  isFilter: boolean;

  @IsBoolean({ message: 'Параметр isSorting должен быть типа boolean' })
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  isSorting: boolean;

  @IsBoolean({ message: 'Параметр onlyFilters должен быть типа boolean' })
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  onlyFilters: boolean;
}
