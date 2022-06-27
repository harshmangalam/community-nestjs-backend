import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        _count: {
          select: {
            articles: true,
            followingTags: true,
          },
        },
        followingTags: {
          select: {
            id: true,
          },
        },
      },
    });
    return {
      user,
    };
  }
}
