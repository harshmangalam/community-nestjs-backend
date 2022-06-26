import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get()
  async getTags() {
    return this.tagsService.getTags();
  }

  @Get('/:tagId')
  async getTagDetail(@Param('tagId') tagId: string) {
    return this.tagsService.getTagDetail(tagId);
  }

  @Post()
  async createTag(@Body() data: CreateTagDto) {
    return this.tagsService.createTag(data);
  }
}
