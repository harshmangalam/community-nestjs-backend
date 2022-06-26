import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getTags() {
    const tags = await this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });
    return {
      tags,
    };
  }

  async getTagDetail(tagId: string) {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },

        articles: {
          include: {
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      tag,
    };
  }

  async createTag(data: CreateTagDto) {
    try {
      const tag = await this.prisma.tag.create({
        data,
      });

      return {
        tag,
      };
    } catch (error) {
      throw error;
    }
  }
}
