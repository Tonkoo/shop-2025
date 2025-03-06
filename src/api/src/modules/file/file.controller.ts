import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@Controller('section')
@ApiTags('section')
export class FileController {}
