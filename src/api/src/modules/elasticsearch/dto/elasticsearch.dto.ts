import {
  IsBoolean,
  IsEmpty,
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
  type?: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  from?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  size?: number;

  @IsString({
    message: 'Параметр searchName должен быть типа string',
  })
  searchName?: string;

  @IsNumber()
  @IsOptional()
  filterSection?: number;

  @IsString()
  @IsOptional()
  typeForm?: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getItems?: boolean;
}

export class ParamsCatalog {
  @IsString({
    message: 'url',
  })
  @IsNotEmpty()
  url: string;

  @IsString({
    message: 'filter',
  })
  filter: string;

  @IsBoolean({
    message: 'layout',
  })
  @Transform(({ value }) => value === 'true')
  layout: boolean;

  @IsBoolean({
    message: 'onlyFilters',
  })
  @Transform(({ value }) => value === 'true')
  onlyFilters: boolean;
}
