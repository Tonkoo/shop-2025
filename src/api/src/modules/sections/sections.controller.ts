import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionDto } from './dto/section.dto';

@Controller('section')
@ApiTags('section')
export class SectionsController {
  constructor(private readonly services: SectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый раздел' })
  @ApiBody({
    description: 'Данные для создания нового раздела',
    type: CreateSectionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: SectionDto,
  })
  create(@Body() data: CreateSectionDto) {
    return this.services.create(data);
  }
}
