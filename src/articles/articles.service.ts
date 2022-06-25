import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getArticles() {
    try {
      const articles = await this.prisma.article.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return {
        articles,
      };
    } catch (error) {
      throw error;
    }
  }
}
