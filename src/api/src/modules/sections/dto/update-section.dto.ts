import { ApiProperty } from '@nestjs/swagger';

export class UpdateSectionDto {
  @ApiProperty({ example: 'test', description: 'Код раздела' })
  code: string;

  @ApiProperty({ example: 'Техника', description: 'Название раздела' })
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список ID изображений' })
  images: number[];

  @ApiProperty({
    example: 0,
    description: 'ID родительского раздела',
    nullable: true,
  })
  id_parent: number;
}
