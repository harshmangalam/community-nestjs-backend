import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

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

  async createArticle(authorId: string, body: CreateArticleDto) {
    try {
      const totalWord = body.content.split(' ').length;
      const wordPerMin = 200;

      const totalEst = totalWord / wordPerMin;
      const [first, rest] = totalEst.toString().split('.');

      let min = Number(first);
   

      const article = await this.prisma.article.create({
        data: {
          title: body.title,
          content: body.content,
          coverImage: body.coverImage,
          readTime: `${min} min`,
          tags: {
            connect: body.tags.map((tag) => ({
              id: tag,
            })),
          },
          authorId,
        },
      });

      return {
        article,
      };
    } catch (error) {
      throw error;
    }
  }
}
