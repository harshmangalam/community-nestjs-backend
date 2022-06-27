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
            followers: true,
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

  async followUnfollowTag(tagId: string, userId: string) {
    try {
      let message = '';
      const isFollowing = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          followingTags: {
            where: {
              id: tagId,
            },
            select: {
              id: true,
            },
          },
        },
      });

      if (isFollowing.followingTags.length) {
        const tag = await this.prisma.tag.update({
          where: {
            id: tagId,
          },
          data: {
            followers: {
              disconnect: {
                id: userId,
              },
            },
          },
        });
        message = `You are no longer following ${tag.name}`;
      } else {
        const tag = await this.prisma.tag.update({
          where: {
            id: tagId,
          },
          data: {
            followers: {
              connect: {
                id: userId,
              },
            },
          },
        });
        message = `You are started follwoing ${tag.name}`;
      }

      return {
        message,
      };
    } catch (error) {
      throw error;
    }
  }
}
