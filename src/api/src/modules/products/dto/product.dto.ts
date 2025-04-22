import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../../entities/products.entity';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'test', description: 'Код продукта' })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({ example: 'Пылесос', description: 'Название продукта' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список ID изображений' })
  @IsArray()
  @IsOptional()
  images: Awaited<number>[] | null;

  @ApiProperty({ example: '123.00', description: 'Цена продукта' })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'Красный', description: 'Цвет продукта' })
  @IsObject()
  @IsOptional()
  color: {
    id: number;
  };

  @ApiProperty({ example: '...', description: 'Описание продукта' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'ID раздела',
  })
  @IsNumber()
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

  section: {
    id: number;
  };

  sectionId: number;

  colorId: number;

  type: string;

  from: string;

  size: string;

  searchName: string;

  getItems: boolean;

  constructor(ent: Products) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    this.images = ent.images;
    this.price = ent.price;
    // this.color = ent.color.id;
    // this.color = ent.color;
    this.description = ent.description;
    this.idSection = ent.section.id;
    this.showOnMain = ent.show_on_main;
    this.mainSlider = ent.main_slider;
    this.createAt = ent.create_at;
    this.updateAt = ent.update_at;
  }
}

export class ColorDto {
  @ApiProperty({ example: 1, description: 'ID цвета' })
  id: number;

  @ApiProperty({ example: 'Красный', description: 'Название цвета' })
  name: string;

  @ApiProperty({ example: '#FF0000', description: 'hex цвета' })
  hex: string;
}
