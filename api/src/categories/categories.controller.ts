import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get('random')
  async getRandomCategories2() {
    return this.categoriesService.getRandomCategoriesWithPodcasts();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.getCategoryById(id);
  }
}