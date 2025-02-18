import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Sections } from '../../entities/sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sections])],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
