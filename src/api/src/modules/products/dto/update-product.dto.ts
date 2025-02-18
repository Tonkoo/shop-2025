import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'test', description: 'Код продукта' })
  code: string;

  @ApiProperty({ example: 'Пылесос', description: 'Название проудкта' })
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
}
