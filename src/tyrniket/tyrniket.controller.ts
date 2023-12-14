import { Controller, Body, HttpCode, Post, Get } from '@nestjs/common';
import { TyrniketService } from './tyrniket.service';
import { tyrniketDto } from './tyrniket.dto';

@Controller('tyrniket')
export class TyrniketController {
  constructor(private readonly tyrniketService: TyrniketService) {}

  @Post()
  @HttpCode(201)
  async add(@Body() info: tyrniketDto) {
    return this.tyrniketService.add(info)
  }

  @Get()
  async all() {
    return this.tyrniketService.all()
  }
}
