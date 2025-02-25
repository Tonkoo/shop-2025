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
  images: Awaited<number>[];

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
  idSection: number;

  @ApiProperty({
    example: true,
    description: 'Признак вывода на главной странице',
  })
  showOnMain: boolean;

  @ApiProperty({
    example: false,
    description: 'Признак “Слайдер на главной”',
  })
  mainSlider: boolean;

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания продукта',
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления продукта',
  })
  updateAt: Date;

  getProduct: boolean;

  constructor(ent: Products) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    // @ts-ignore
    this.images.id = ent.images;
    this.price = ent.price;
    this.color = ent.color;
    this.description = ent.description;
    this.idSection = ent.id_section;
    this.showOnMain = ent.show_on_main;
    this.mainSlider = ent.main_slider;
    this.createAt = ent.create_at;
    this.updateAt = ent.update_at;
    this.getProduct = false;
  }
}
