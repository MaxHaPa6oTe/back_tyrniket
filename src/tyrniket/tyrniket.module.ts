import { Module } from '@nestjs/common';
import { TyrniketService } from './tyrniket.service';
import { TyrniketController } from './tyrniket.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TyrniketController],
  providers: [TyrniketService, PrismaService],
})
export class TyrniketModule {}
