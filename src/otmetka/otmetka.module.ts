import { Module } from '@nestjs/common';
import { OtmetkaService } from './otmetka.service';
import { OtmetkaController } from './otmetka.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OtmetkaController],
  providers: [OtmetkaService, PrismaService, JwtService],
})
export class OtmetkaModule {}
