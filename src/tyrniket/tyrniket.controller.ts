import { Controller, Body, HttpCode, Post, Get } from '@nestjs/common';
import { TyrniketService } from './tyrniket.service';
import { tyrniketDto } from './tyrniket.dto';
import { zdanieDto } from './zdanie.dto';

@Controller('tyrniket')
export class TyrniketController {
  constructor(private readonly tyrniketService: TyrniketService) {}

  @Post()
  @HttpCode(201)
  async add(@Body() info: tyrniketDto) {
    return this.tyrniketService.add(info)
  }

  @Get()
  @HttpCode(200)
  async all() {
    return this.tyrniketService.all()
  }

  @Post('zdanie')
  @HttpCode(201)
  async addZdanie(@Body() dto:zdanieDto) {
    return this.tyrniketService.addZdanie(dto)
  }

  @Get('zdanie')
  @HttpCode(200)
  async Zdanie() {
    return this.tyrniketService.Zdanie()
  }
}
