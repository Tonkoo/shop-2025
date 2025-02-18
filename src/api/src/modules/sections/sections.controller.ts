import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionDto } from './dto/section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

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

  @Put(':id')
  updateById(@Param('id') id: number, @Body() data: UpdateSectionDto) {
    return this.services.updateById(id, data);
  }
}
