import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../../entities/products.entity';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  id: number;

  @ApiProperty({ example: 'test', description: 'Код продукта' })
  code: string;

  @ApiProperty({ example: 'Пылесос', description: 'Название продукта' })
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список ID изображений' })
  images: number[];

  @ApiProperty({ example: '123.00', description: 'Цена продукта' })
  price: number;

  @ApiProperty({ example: 'Красный', description: 'Цвет продукта' })
  color: string;

  @ApiProperty({ example: '...', description: 'Описание продукта' })
  description: string;

  @ApiProperty({
    example: 2,
    description: 'ID раздела',
  })
  id_section: number;

  @ApiProperty({
    example: true,
    description: 'Признак вывода на главной странице',
  })
  show_on_main: boolean;

  @ApiProperty({
    example: false,
    description: 'Признак “Слайдер на главной”',
  })
  main_slider: boolean;

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания продукта',
  })
  create_at: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления продукта',
  })
  update_at: Date;

  constructor(ent: Products) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    this.images = ent.images;
    this.price = ent.price;
    this.color = ent.color;
    this.description = ent.description;
    this.id_section = ent.id_section;
    this.show_on_main = ent.show_on_main;
    this.main_slider = ent.main_slider;
    this.create_at = ent.create_at;
    this.update_at = ent.update_at;
  }
}
