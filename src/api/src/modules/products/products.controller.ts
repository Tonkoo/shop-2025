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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { ColorDto, ProductDto } from './dto/product.dto.js';
import {
  ResponseHelper,
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from './../../utils/response.util.js';
import { ProductBase } from './../../interfaces/adminGlobal.js';
import { Response, ResultItems } from './../../interfaces/responseGlobal.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterOptions } from './../../config/multer.config.js';
import { Colors } from './../../entities/colors.entity.js';

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
  ): Promise<Response> {
    const result: number | ResultItems = await this.services.create(
      data,
      files,
    );
    return ResponseHelper.createResponse(HttpStatus.CREATED, result);
  }

  @Get('/id')
  @ApiOperation({ summary: 'Получение продукта по идентификатору' })
  @ApiBody({
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
  async getProduct(@Query('id') id: number): Promise<Response> {
    const result: ProductBase | ProductBase[] =
      await this.services.getProductById(id);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 10 }],
      getMulterOptions('section'),
    ),
  )
  @ApiOperation({ summary: 'Изменение данных продукта' })
  @ApiBody({
    description: 'Данные для изменения продукта',
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
  async updateById(
    @Param('id') id: number,
    @Body() data: ProductDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ) {
    const result: ResultItems | number = await this.services.updateById(
      id,
      data,
      files,
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
  async deleteById(@Param('id') id: number, @Query() data: ProductDto) {
    const result: ResultItems | number = await this.services.deleteById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Get('/colors')
  @ApiOperation({ summary: 'Получение цветов из БД' })
  @ApiBody({
    description: 'Формат вывода данных из таблицы Colors',
    type: ColorDto,
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
  async getColors(): Promise<Response> {
    const result: Colors[] = await this.services.getColor();
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
