import { Sections } from '../../../entities/sections.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SectionDto {
  @ApiProperty({ example: 1, description: 'ID раздела' })
  id: number;

  @ApiProperty({ example: 'test', description: 'Код раздела' })
  code: string;

  @ApiProperty({ example: 'Техника', description: 'Название раздела' })
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список изображений' })
  images: Awaited<number>[] | null;

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания раздела',
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления раздела',
  })
  updateAt: Date;

  @ApiProperty({
    example: 0,
    description: 'ID родительского раздела',
    nullable: true,
  })
  idParent: number | null;

  type: string;

  from: string;

  size: string;

  searchName: string;

  getSection: boolean;

  constructor(ent: Sections) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    this.images = ent.images;
    this.createAt = ent.create_at;
    this.updateAt = ent.update_at;
    this.idParent = ent.id_parent;
  }
}

export class TestSectionDto {
  section: SectionDto;
}
