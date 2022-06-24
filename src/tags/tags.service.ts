import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getTags() {
    const tags = await this.prisma.tag.findMany();
    return {
      tags,
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
