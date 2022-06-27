import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guard';
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

  @Patch("/:tagId/followUnfollow")
  @UseGuards(JwtGuard)
  async followUnfollowTag(
    @Param('tagId') tagId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.tagsService.followUnfollowTag(tagId, userId);
  }
}
