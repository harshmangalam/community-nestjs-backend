import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}
  @Get()
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Post()
  @UseGuards(JwtGuard)
  createArticle(
    @Body() body: CreateArticleDto,
    @CurrentUser('id') authorId: string,
  ) {
   
    return this.articlesService.createArticle(authorId, body);
  }
}
