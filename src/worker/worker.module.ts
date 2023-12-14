import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express'
import { FileModule } from './file/file.module';

@Module({
  imports: [ 
    // MulterModule.registerAsync({
    // useFactory: () => ({
    //   dest: './upload',
    // }),
  // })
  FileModule
],
  controllers: [WorkerController],
  providers: [WorkerService, PrismaService],
})
export class WorkerModule {}