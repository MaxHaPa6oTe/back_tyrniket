import { Module } from '@nestjs/common';
import { DostypService } from './dostyp.service';
import { DostypController } from './dostyp.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DostypController],
  providers: [DostypService, PrismaService, JwtService],
})
export class DostypModule {}
