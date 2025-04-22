import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SectionDto {
  @ApiProperty({ example: 1, description: 'ID раздела' })
  @IsNumber({}, { message: 'ID must be a number' })
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'test', description: 'Код раздела' })
  @IsString({ message: 'Code must be a string' })
  @IsOptional()
  code: string;

  @ApiProperty({ example: 'Техника', description: 'Название раздела' })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Список изображений' })
  @IsArray({ message: 'Images must be an array', each: true })
  @Transform(({ value }) => {
    if (value === '') {
      return [];
    }
  })
  @IsOptional()
  images?: Awaited<number>[] | null;

  @ApiProperty({
    example: '2023-10-10T12:00:00.000Z',
    description: 'Дата создания раздела',
  })
  @IsDate()
  @IsOptional()
  createAt: Date;

  @ApiProperty({
    example: '2023-10-11T12:00:00.000Z',
    description: 'Дата обновления раздела',
  })
  @IsDate()
  @IsOptional()
  updateAt: Date;

  @ApiProperty({
    example: 0,
    description: 'ID родительского раздела',
    nullable: true,
  })
  @IsNumber({}, { message: 'idParent must be a number' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  idParent?: number | null;

  @ApiProperty({
    example: 0,
    description: 'Уровень раздела',
    nullable: true,
  })
  @IsNumber({}, { message: 'Level must be a number' })
  @IsOptional()
  level: number;

  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsNumber({}, { message: 'From must be a number' })
  from: number;

  @IsNumber({}, { message: 'Size must be a number' })
  size: number;

  @IsString({ message: 'searchName must be a string' })
  searchName: string;

  @IsBoolean()
  @IsOptional()
  getItems: boolean;
}
