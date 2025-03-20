import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  HttpStatus,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import {
  ResponseHelper,
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from '../../utils/response.util';
import { response, resultItems } from '../../interfaces/global';
import { Products } from '../../entities/products.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';

class DeleteProductDto {
  @ApiProperty({ example: true, description: 'Признак обновления данных' })
  getProduct: boolean;
}

@Controller('product')
@ApiTags('product')
export class ProductsController {
  constructor(private readonly services: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 10 }],
      getMulterOptions('section'),
    ),
  )
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiBody({
    description: 'Данные для создания нового продукта',
    type: ProductDto,
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
  async create(
    @Body() data: ProductDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ): Promise<response> {
    const result: Products | resultItems[] = await this.services.create(
      data,
      files,
    );
    return ResponseHelper.createResponse(HttpStatus.CREATED, result);
  }

  @ApiOperation({ summary: 'Вывод данных таблицы' })
  @ApiBody({
    description: 'Вывод данных таблицы',
    type: ProductDto,
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
  @Get()
  async getList(): Promise<response> {
    const result: Products[] = await this.services.getList();
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменение данных продукта' })
  @ApiBody({
    description: 'Данные для изменения данных продукта',
    type: ProductDto,
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
  async updateById(@Param('id') id: number, @Body() data: ProductDto) {
    const result: Products | Products[] = await this.services.updateById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление продукта' })
  @ApiBody({
    description: 'Удаление продукта',
    type: DeleteProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async deleteById(@Param('id') id: number, @Body() data: ProductDto) {
    const result: number | Products[] = await this.services.deleteById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
