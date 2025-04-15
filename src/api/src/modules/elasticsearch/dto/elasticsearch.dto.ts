import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FilterCatalog } from '../../../interfaces/global';

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

// export class paramsCatalog {
//   url: string;
//   filter: FilterCatalog;
//   layout: string;
//   onlyFilters: string;
// }
