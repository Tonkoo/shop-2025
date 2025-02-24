import { Sections } from '../../../entities/sections.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Images } from '../../../entities/images.entity';

export class SectionDto {
  @ApiProperty({ example: 1, description: 'ID раздела' })
  id: number;

  @ApiProperty({ example: 'test', description: 'Код раздела' })
  code: string;

  @ApiProperty({ example: 'Техника', description: 'Название раздела' })
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список изображений' })
  images: ImagesDto[];

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
  idParent: number;

  getSection: boolean;

  constructor(ent: Sections) {
    this.id = ent.id;
    this.code = ent.code;
    this.name = ent.name;
    this.images = ent.images?.map((image) => new ImagesDto(image)) ?? [];
    this.createAt = ent.create_at;
    this.updateAt = ent.update_at;
    this.idParent = ent.id_parent;
    this.getSection = false;
  }
}

export class ImagesDto {
  @ApiProperty({ example: '1', description: 'ID файла' })
  id: number;

  @ApiProperty({ example: 'logo.png', description: 'Имя файла' })
  imagesName: string;

  @ApiProperty({ example: 'images/logo.png', description: 'Путь к файлу' })
  imagesPath: string;

  @ApiProperty({ example: 'PNG', description: 'Формат файла' })
  imagesType: string;

  constructor(ent: Images) {
    this.id = ent.id;
    this.imagesName = ent.name;
    this.imagesPath = ent.path;
    this.imagesType = ent.type;
  }
}
