import { Controller, Body, HttpCode, Post, Get, UseGuards } from '@nestjs/common';
import { TyrniketService } from './tyrniket.service';
import { tyrniketDto } from './tyrniket.dto';
import { zdanieDto } from './zdanie.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminJwtGuard } from 'src/auth/guards/admin.guard';

@Controller('tyrniket')
export class TyrniketController {
  constructor(private readonly tyrniketService: TyrniketService) {}

  // @UseGuards(AdminJwtGuard)
  @Post()
  @HttpCode(201)
  async add(@Body() info: tyrniketDto) {
    return this.tyrniketService.add(info)
  }

  // @UseGuards(JwtGuard)
  @Get()
  @HttpCode(200)
  async all() {
    return this.tyrniketService.all()
  }

  // @UseGuards(AdminJwtGuard)
  @Post('zdanie')
  @HttpCode(201)
  async addZdanie(@Body() dto: zdanieDto) {
    return this.tyrniketService.addZdanie(dto)
  }

  // @UseGuards(JwtGuard)
  @Get('zdanie')
  @HttpCode(200)
  async Zdanie() {
    return this.tyrniketService.Zdanie()
  }
}
