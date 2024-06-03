import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // Método para obtener todas las categorías
  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  // Método para obtener una categoría por ID
  async getCategoryById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  // Método para obtener 5 categorías aleatorias con al menos 4 podcasts
  async getRandomCategoriesWithPodcasts(): Promise<any> {
    const allCategories = await this.prisma.category.findMany({
      include: {
        podcasts: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              }
            },
          },
        },
      },
    });
  
    // Filtrar categorías para incluir solo aquellas con al menos 4 podcasts
    const categoriesWithEnoughPodcasts = allCategories.filter(category => category.podcasts.length >= 4);
  
    if (categoriesWithEnoughPodcasts.length < 5) {
      throw new Error('Not enough categories with at least 4 podcasts in the database.');
    }
  
    // Seleccionar 5 categorías aleatorias
    const randomCategories = this.getRandomElements(categoriesWithEnoughPodcasts, 5);
  
    // Para cada categoría seleccionada, seleccionar 4 podcasts aleatorios y mapear el resultado
    const categoriesWithPodcasts = randomCategories.map((category) => {
      const randomPodcasts = this.getRandomElements(category.podcasts, 4);
      const mappedPodcasts = randomPodcasts.map((podcast) => ({
        ...podcast,
        username: podcast.user.username,
        category: podcast.category.name,
        categoryId: podcast.category.id,
        user: undefined, // Eliminar el objeto user para que no se duplique
      }));
      return {
        category: {
          id: category.id,
          name: category.name,
          podcastCount: category.podcasts.length, // Incluir el número total de podcasts en la categoría
        },
        podcasts: mappedPodcasts,
      };
    });

    return categoriesWithPodcasts;
  }

  // Método para obtener elementos aleatorios de un array
  private getRandomElements<T>(arr: T[], count: number): T[] {
    if (count > arr.length) {
      throw new RangeError("getRandomElements: more elements taken than available");
    }
    const result = [];
    const taken = [...arr];
    while (count--) {
      const x = Math.floor(Math.random() * taken.length);
      result.push(taken.splice(x, 1)[0]);
    }
    return result;
  }
}