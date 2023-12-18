import { Query,UseInterceptors,Controller,UsePipes,ValidationPipe,Body,Post,HttpCode, UploadedFile, ParseFilePipe, FileTypeValidator, Delete, Param, SetMetadata, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { workerDto } from './worker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Get, Put } from '@nestjs/common/decorators/http';
import { PoiskDto } from './posik.dto';



@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('create')
  @UseInterceptors(FileInterceptor('photo'))
  async createWorker(
    @Body() body: workerDto,
    @UploadedFile() photo:any
  ) {
    return this.workerService.create(body, photo)
  }

  @Delete(':id')
  async del(@Param('id') id: number) {
    return this.workerService.del(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Body() body:workerDto,
  @UploadedFile() photo:any,
  @Param('id') id:number
  ) {
    return this.workerService.update(id ,body, photo)
  }
  
  @Post('all')
  @HttpCode(200)
  async getAllWorkers(@Body() body:PoiskDto) {
    return this.workerService.poiskAll(body)
  }
  @Get(':id')
  @HttpCode(200)
  async obzorRaba(@Param('id') id:number) {
    return this.workerService.obzorRaba(id)
  }
}