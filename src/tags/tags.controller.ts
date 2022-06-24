import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get()
  async getTags() {
    return this.tagsService.getTags();
  }

  @Post()
  async createTag(@Body() data: CreateTagDto) {
    return this.tagsService.createTag(data);
  }
}
