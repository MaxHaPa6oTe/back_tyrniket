import { Module } from '@nestjs/common';
import { TyrniketService } from './tyrniket.service';
import { TyrniketController } from './tyrniket.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TyrniketController],
  providers: [TyrniketService, PrismaService, JwtService],
})
export class TyrniketModule {}
