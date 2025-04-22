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
  from?: number;

  @IsNumber()
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
  @IsOptional()
  getItems?: boolean;
}

export class ParamsCatalog {
  @IsString({
    message: 'url',
  })
  @IsNotEmpty()
  url: string;

  // @IsString({
  //   message: 'sorting',
  // })
  // sorting: string;

  @IsString({
    message: 'filter',
  })
  filter: string;
  // filter: FilterCatalog;
  // @Transform(({ value }) => value === 'true' )

  @IsBoolean({
    message: 'layout',
  })
  // @Transform(({ value }) => {
  //   console.log(typeof value);
  //   return Boolean(value);
  // })
  layout: boolean;

  @IsBoolean({
    message: 'onlyFilters',
  })
  @Transform(({ value }) => value === 'true')
  onlyFilters: boolean;
}
