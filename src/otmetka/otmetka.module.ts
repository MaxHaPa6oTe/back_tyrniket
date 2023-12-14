import { Module } from '@nestjs/common';
import { OtmetkaService } from './otmetka.service';
import { OtmetkaController } from './otmetka.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OtmetkaController],
  providers: [OtmetkaService, PrismaService],
})
export class OtmetkaModule {}
