import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';

@Controller('section')
@ApiTags('section')
export class ProductController {
  constructor(private readonly services: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый раздел' })
  @ApiBody({
    description: 'Данные для создания нового раздела',
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
}
