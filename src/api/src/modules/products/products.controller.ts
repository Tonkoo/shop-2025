import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
@ApiTags('product')
export class ProductsController {
  constructor(private readonly services: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiBody({
    description: 'Данные для создания нового продукта',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ProductDto,
  })
  create(@Body() data: CreateProductDto) {
    return this.services.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменение данных продукта' })
  @ApiBody({
    description: 'Данные для изменения данных продукта',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успеx',
  })
  updateById(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.services.updateById(id, data);
  }
}
