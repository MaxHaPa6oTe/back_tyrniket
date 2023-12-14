import { Module } from '@nestjs/common';
import { DostypService } from './dostyp.service';
import { DostypController } from './dostyp.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DostypController],
  providers: [DostypService, PrismaService],
})
export class DostypModule {}
