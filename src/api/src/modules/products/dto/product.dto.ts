import { Sections } from '../../../entities/sections.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'ID раздела' })
  id: number;

  @ApiProperty({ example: 'test', description: 'Код раздела' })
  code: string;

  @ApiProperty({ example: 'Техника', description: 'Название раздела' })
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список ID изображений' })
  images: number[];

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания раздела',
  })
  create_at: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления раздела',
  })
  update_at: Date;

  @ApiProperty({
    example: 0,
    description: 'ID родительского раздела',
    nullable: true,
  })
  id_parent: number;

  constructor(ent: Sections) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    this.images = ent.images;
    this.create_at = ent.create_at;
    this.update_at = ent.update_at;
    this.id_parent = ent.id_parent;
  }
}
