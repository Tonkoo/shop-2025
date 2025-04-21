import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FilterCatalog } from '../../../interfaces/global';
import { Transform } from 'class-transformer';

export class payLoad {
  @IsString({
    message: 'Параметр type должен быть типа string',
  })
  @IsNotEmpty()
  type?: string;

  @IsNumber()
  from?: number;

  @IsNumber()
  @IsNotEmpty()
  size?: number;

  @IsString({
    message: 'Параметр searchName должен быть типа string',
  })
  searchName?: string;

  @IsString({
    message: 'Параметр filterSection должен быть типа string',
  })
  filterSection?: number;

  typeForm?: string;

  getItems?: boolean;
}

// export class ParamsCatalog {
//   @IsString({
//     message: 'url',
//   })
//   url: string;
//
//   // @IsString({
//   //   message: 'sorting',
//   // })
//   // sorting: string;
//
//   @IsString({
//     message: 'filter',
//   })
//   filter: string;
//   // filter: FilterCatalog;
//   // @Transform(({ value }) => value === 'true' )
//
//   @IsBoolean({
//     message: 'layout',
//   })
//   // @Transform(({ value }) => {
//   //   console.log(typeof value);
//   //   return Boolean(value);
//   // })
//   layout: boolean;
//
//   @IsBoolean({
//     message: 'onlyFilters',
//   })
//   @Transform(({ value }) => {
//     console.log(value);
//     return Boolean(value);
//   })
//   onlyFilters: boolean;
// }
