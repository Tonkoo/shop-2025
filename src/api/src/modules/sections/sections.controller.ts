import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { SectionDto } from './dto/section.dto';
import {
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from '../../utils/response.util';

@Controller('section')
@ApiTags('section')
export class SectionsController {
  constructor(private readonly services: SectionsService) {}

  @Get()
  getList() {
    return this.services.getList();
  }
  @Post()
  @ApiOperation({ summary: 'Создать новый раздел' })
  @ApiBody({
    description: 'Данные для создания нового раздела',
    type: SectionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Успешный ответ',
    type: ResponseHelperApiCreated,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка',
    type: ResponseHelperApiError,
  })
  create(@Body() data: SectionDto) {
    return this.services.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменение данных раздела' })
  @ApiBody({
    description: 'Данные для изменения данных раздела',
    type: SectionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка',
    type: ResponseHelperApiError,
  })
  updateById(@Param('id') id: number, @Body() data: SectionDto) {
    //Todo: Если приходит параметр getProducts: true, то мы сначала ожидем выполнения метода для обновления section.
    //Todo: И в случае если section обновился, то вызываем метод для получения section
    //Todo: Если параметер false, то делать тоько обновление
    return this.services.updateById(id, data);
  }
}
