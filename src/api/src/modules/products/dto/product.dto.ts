import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  @IsNumber({}, { message: 'ID must be a number' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'test', description: 'Код продукта' })
  @IsString({ message: 'Code must be a string' })
  @IsOptional()
  code: string;

  @ApiProperty({ example: 'Пылесос', description: 'Название продукта' })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список ID изображений' })
  @IsArray({ message: 'Images must be an array', each: true })
  @Transform(({ value }) => {
    if (value === '') {
      return [];
    }
  })
  @IsOptional()
  images?: Awaited<number>[] | null;

  @ApiProperty({ example: '123.00', description: 'Цена продукта' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'Красный', description: 'Цвет продукта' })
  @IsNumber({}, { message: 'idColor must be a number' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  idColor: number;

  @ApiProperty({ example: '...', description: 'Описание продукта' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'ID раздела',
  })
  @IsNumber({}, { message: 'idSection must be a number' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  idSection: number;

  @ApiProperty({
    example: true,
    description: 'Признак вывода на главной странице',
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  showOnMain: boolean;

  @ApiProperty({
    example: false,
    description: 'Признак “Слайдер на главной”',
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  mainSlider: boolean;

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания продукта',
  })
  @IsDate()
  @IsOptional()
  createAt: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления продукта',
  })
  @IsDate()
  @IsOptional()
  updateAt: Date;

  @IsObject()
  @IsOptional()
  section?: {
    id: number;
  };

  @IsObject()
  @IsOptional()
  color?: {
    id: number;
  };

  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsNumber({}, { message: 'From must be a number' })
  @Transform(({ value }) => Number(value))
  from: number;

  @IsNumber({}, { message: 'Size must be a number' })
  @Transform(({ value }) => Number(value))
  size: number;

  @IsString({ message: 'searchName must be a string' })
  searchName: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getItems: boolean;
}

export class ColorDto {
  @ApiProperty({ example: 1, description: 'ID цвета' })
  id: number;

  @ApiProperty({ example: 'Красный', description: 'Название цвета' })
  name: string;

  @ApiProperty({ example: '#FF0000', description: 'hex цвета' })
  hex: string;
}
